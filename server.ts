import { eq } from "drizzle-orm"
import fastify from "fastify"
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod"
import { db } from "./src/database/client.ts"
import { courses } from "./src/database/schema.ts"
import { z } from "zod"
import { title } from "process"

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hosname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.get("/courses", async (request, reply) => {
  //const result = await db.select().from(courses) Se vazio, traz todos os campos
  const result = await db
    .select({
      id: courses.id,
      title: courses.title,
    })
    .from(courses)

  return reply.send({ courses: result })
})

server.get(
  "/courses/:id",
  {
    schema: {
      params: z.object({
        id: z.uuid(),
      }),
    },
  },
  async (request, reply) => {
    const courseId = request.params.id

    const result = await db
      .select()
      .from(courses)
      .where(eq(courses.id, courseId))

    if (result.length > 0) {
      return { course: result[0] }
    }

    return reply.status(404).send("Registro não encontrado!")
  }
)

server.post(
  "/courses",
  {
    schema: {
      body: z.object({
        title: z.string().min(5, "Título precisa de pelo menos 5 caracteres"),
        description: z.string(),
      }),
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

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!")
})
