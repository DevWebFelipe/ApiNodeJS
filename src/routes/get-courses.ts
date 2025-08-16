import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../database/client.ts"
import { courses, enrollments } from "../database/schema.ts"
import { ilike, asc, SQL, and, eq, count } from "drizzle-orm"
import { z } from "zod"

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses",
    {
      schema: {
        tags: ["courses"],
        summary: "Listar todos os cursos",
        querystring: z.object({
          search: z.string().optional(),
          orderBy: z.enum(["title", "id"]).optional().default("id"),
          page: z.coerce.number().optional().default(1),
        }),
        description: "Retorna um objeto com uma lista de objetos(courses)",
        response: {
          200: z
            .object({
              courses: z.array(
                z.object({
                  id: z.uuid(),
                  title: z.string(),
                  enrollments: z.number(),
                })
              ),
              total: z.number(),
            })
            .describe("Retorna um objeto com um array de objetos(courses)"),
        },
      },
    },
    async (request, reply) => {
      const { search, orderBy, page } = request.query

      const conditions: SQL[] = []

      if (search) {
        conditions.push(ilike(courses.title, `%${search}%`))
      }

      const [result, total] = await Promise.all([
        db
          .select({
            id: courses.id,
            title: courses.title,
            enrollments: count(enrollments.id),
          })
          .from(courses)
          .leftJoin(enrollments, eq(enrollments.courseId, courses.id))
          .where(and(...conditions))
          .orderBy(asc(courses[orderBy]))
          .offset((page - 1) * 10)
          .groupBy(courses.id)
          .limit(10),
        db.$count(courses, and(...conditions)),
      ])

      return reply.send({ courses: result, total })
    }
  )
}
