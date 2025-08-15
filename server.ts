import { eq } from "drizzle-orm"
import fastify from "fastify"
import { db } from "./src/database/client.ts"
import { courses } from "./src/database/schema.ts"

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
})

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

server.get("/courses/:id", async (request, reply) => {
  type Params = {
    id: string
  }

  const params = request.params as Params
  const courseId = params.id

  const result = await db.select().from(courses).where(eq(courses.id, courseId))

  if (result.length > 0) {
    return { course: result[0] }
  }

  return reply.status(404).send("Registro não encontrado!")
})

server.post("/courses", async (request, reply) => {
  type Body = {
    title: string
    description: string
  }

  const body = request.body as Body
  const courseTitle = body.title
  const courseDescription = body.description

  if (!courseTitle) {
    return reply
      .status(400)
      .send({ message: "Obrigatório informar um título!" })
  }

  const result = await db
    .insert(courses)
    .values({
      title: courseTitle,
      description: courseDescription,
    })
    .returning()

  return reply.status(201).send({ courseId: result[0].id })
})

server.put("/courses/:id", async (request, reply) => {
  type Params = { id: string }
  type Body = {
    title: string
    description: string
  }

  const params = request.params as Params
  const body = request.body as Body
  const courseId = params.id
  const bodyTitle = body.title
  const bodyDescription = body.description

  const result = await db.select().from(courses).where(eq(courses.id, courseId))

  if ((result.length = 0)) {
    return reply.status(404).send({ message: "Registro não encontrado!" })
  }

  if (!bodyTitle) {
    return reply
      .status(400)
      .send({ message: "Obrigatório informar um título!" })
  }

  if (bodyDescription) {
    await db
      .update(courses)
      .set({
        title: bodyTitle,
        description: bodyDescription,
      })
      .where(eq(courses.id, courseId))
  } else {
    await db
      .update(courses)
      .set({
        title: bodyTitle,
      })
      .where(eq(courses.id, courseId))
  }

  return reply.send({ message: "Curso atualizado com sucesso!" })
})

server.delete("/courses/:id", async (request, reply) => {
  type Params = { id: String }

  const params = request.params as Params
  const courseId = params.id

  const result = await db.select().from(courses).where(eq(courses.id, courseId))

  if ((result.length = 0)) {
    return reply.status(404).send({ message: "Registro não encontrado!" })
  }

  await db.delete(courses).where(eq(courses.id, courseId))

  return reply.send({ message: "Curso excluído com sucesso!" })
})

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!")
})
