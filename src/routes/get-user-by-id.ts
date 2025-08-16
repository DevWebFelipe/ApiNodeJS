import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../database/client.ts"
import { users } from "../database/schema.ts"
import { email, uuid, z } from "zod"
import { eq } from "drizzle-orm"

export const getUserByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/users/:id",
    {
      schema: {
        tags: ["users"],
        summary: "Busca um usuário por id",
        description: "Retorna um objeto user",
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          200: z
            .object({
              user: z.object({
                id: z.uuid(),
                name: z.string(),
                email: z.string(),
                password: z.string(),
                role: z.string(),
                createdAt: z.date(),
              }),
            })
            .describe("Retorna o objeto completo encontrado"),
          404: z.null().describe("Registro não encontrado!"),
        },
      },
    },
    async (request, reply) => {
      const userId = request.params.id

      const result = await db.select().from(users).where(eq(users.id, userId))

      if (result.length > 0) {
        return { user: result[0] }
      }

      return reply.status(404).send()
    }
  )
}
