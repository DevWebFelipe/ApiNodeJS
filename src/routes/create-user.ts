import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../database/client.ts"
import { users } from "../database/schema.ts"
import { z } from "zod"
import { hash } from "argon2"

export const createUsersRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/users",
    {
      schema: {
        tags: ["users"],
        summary: "Insere um novo usuário",
        description: "Nome, email e senha obrigatórios",
        body: z.object({
          name: z.string().min(5, "Título precisa de pelo menos 5 caracteres"),
          email: z.email(),
          role: z.enum(["student", "manager"]).default("student"),
          password: z
            .string()
            .min(8, "Senha deve conter pelo menos 8 caracteres"),
        }),
        response: {
          201: z
            .object({ userId: z.uuid() })
            .describe("Usuário inserido com sucesso"),
        },
      },
    },
    async (request, reply) => {
      const userEmail = request.body.email
      const userName = request.body.name
      const userPassword = await hash(request.body.password)
      const userRole = request.body.role

      const result = await db
        .insert(users)
        .values({
          email: userEmail,
          name: userName,
          password: userPassword,
          role: userRole,
        })
        .returning()

      return reply.status(201).send({ userId: result[0].id })
    }
  )
}
