import { test, expect } from "vitest"
import request from "supertest"
import { server } from "../app.ts"
import { makeCourse } from "../tests/factories/make-course.ts"
import { randomUUID } from "node:crypto"

test("get course by id", async () => {
  await server.ready() // espera o servidor registrar todos os módulos para então executar

  const titleId = randomUUID()
  const course = await makeCourse(titleId)

  const response = await request(server.server).get(
    `/courses?search=${titleId}`
  )

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    total: 1,
    courses: [
      {
        id: expect.any(String),
        title: expect.any(String),
        enrollments: 0,
      },
    ],
  })
})
