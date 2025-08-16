import fastify from "fastify"
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod"
import { fastifySwagger } from "@fastify/swagger"
import { createCoursesRoute } from "./routes/create-course.ts"
import { getCoursesRoute } from "./routes/get-courses.ts"
import { getCourseByIdRoute } from "./routes/get-course-by-id.ts"
import { loginRoute } from "./routes/login.ts"
import scalarAPIReference from "@scalar/fastify-api-reference"
import { getUsersRoute } from "./routes/get-users.ts"
import { getUserByIdRoute } from "./routes/get-user-by-id.ts"
import { createUsersRoute } from "./routes/create-user.ts"

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

if (process.env.NODE_ENV === "development") {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Desafio Node.Js",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  })

  server.register(scalarAPIReference, {
    routePrefix: "/docs",
    configuration: {
      theme: "kepler",
    },
  })
}

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(createCoursesRoute)
server.register(getCoursesRoute)
server.register(getCourseByIdRoute)
server.register(loginRoute)
server.register(getUsersRoute)
server.register(getUserByIdRoute)
server.register(createUsersRoute)

export { server }
