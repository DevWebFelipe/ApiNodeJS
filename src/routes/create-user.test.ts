import { test, expect } from "vitest"
import request from "supertest"
import { server } from "../app.ts"
import { faker } from "@faker-js/faker"

test("create a user", async () => {
  await server.ready() // espera o servidor registrar todos os módulos para então executar

  const response = await request(server.server)
    .post("/users")
    .set("Content-Type", "application/json")
    .send({
      name: faker.lorem.words(4),
      email: faker.internet.email(),
      password: faker.internet.password(),
    })

  expect(response.status).toEqual(201)
  expect(response.body).toEqual({
    userId: expect.any(String),
  })
})
