import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../database/client.ts"
import { courses } from "../database/schema.ts"
import { z } from "zod"

export const createCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/courses",
    {
      schema: {
        tags: ["courses"],
        summary: "Insere um novo curso",
        description: "Título obrigatório(e único) e descrição opcional",
        body: z.object({
          title: z.string().min(5, "Título precisa de pelo menos 5 caracteres"),
          description: z.string(),
        }),
        response: {
          201: z
            .object({ courseId: z.uuid() })
            .describe("Curso inserido com sucesso"),
        },
      },
    },
    async (request, reply) => {
      const courseTitle = request.body.title
      const courseDescription = request.body.description

      const result = await db
        .insert(courses)
        .values({
          title: courseTitle,
          description: courseDescription,
        })
        .returning()

      return reply.status(201).send({ courseId: result[0].id })
    }
  )
}
