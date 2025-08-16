import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../database/client.ts"
import { users } from "../database/schema.ts"
import { ilike, asc, SQL, and } from "drizzle-orm"
import { z } from "zod"

export const getUsersRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/users",
    {
      schema: {
        tags: ["users"],
        summary: "Listar todos os usuários",
        querystring: z.object({
          search: z.string().optional(),
          orderBy: z.enum(["name", "id", "createdAt"]).optional().default("id"),
          page: z.coerce.number().optional().default(1),
        }),
        description: "Retorna um objeto com uma lista de objetos(users)",
        response: {
          200: z
            .object({
              users: z.array(
                z.object({
                  id: z.uuid(),
                  name: z.string(),
                  email: z.string(),
                  role: z.string(),
                })
              ),
              total: z.number(),
            })
            .describe("Retorna um objeto com um array de objetos(users)"),
        },
      },
    },
    async (request, reply) => {
      const { search, orderBy, page } = request.query

      const conditions: SQL[] = []

      if (search) {
        conditions.push(ilike(users.name, `%${search}%`))
      }

      const [result, total] = await Promise.all([
        db
          .select({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
          })
          .from(users)
          .where(and(...conditions))
          .orderBy(asc(users[orderBy]))
          .offset((page - 1) * 10)
          .limit(10),
        db.$count(users, and(...conditions)),
      ])

      return reply.send({ users: result, total })
    }
  )
}
