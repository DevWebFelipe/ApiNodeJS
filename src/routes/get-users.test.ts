import { test, expect } from "vitest"
import request from "supertest"
import { server } from "../app.ts"
import { makeUser } from "../tests/factories/make-user.ts"

test("get course by id", async () => {
  await server.ready() // espera o servidor registrar todos os módulos para então executar

  const { user } = await makeUser()

  const response = await request(server.server).get(
    `/users?search=${user.name}`
  )

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    total: expect.any(Number),
    users: [
      {
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        role: expect.any(String),
      },
    ],
  })
})
