import { test, expect } from "vitest"
import request from "supertest"
import { server } from "../app.ts"
import { makeUser } from "../tests/factories/make-user.ts"

test("get user by id", async () => {
  await server.ready() // espera o servidor registrar todos os módulos para então executar

  const { user } = await makeUser()

  const response = await request(server.server).get(`/users/${user.id}`)

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    user: {
      id: expect.any(String),
      name: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
      role: expect.any(String),
      createdAt: expect.any(String),
    },
  })
})

test("return 404 for none existing course", async () => {
  await server.ready() // espera o servidor registrar todos os módulos para então executar

  const response = await request(server.server).get(
    "/users/CBA2E131-C83C-471A-9DAC-4F4A84B55476"
  )

  expect(response.status).toEqual(404)
})
