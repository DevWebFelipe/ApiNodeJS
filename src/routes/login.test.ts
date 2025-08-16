import { test, expect } from "vitest"
import request from "supertest"
import { server } from "../app.ts"
import { faker } from "@faker-js/faker"
import { makeUser } from "../tests/factories/make-user.ts"

test("realiza um login", async () => {
  await server.ready() // espera o servidor registrar todos os módulos para então executar

  const { user, passwordBeforeHash } = await makeUser()

  const response = await request(server.server)
    .post("/sessions")
    .set("Content-Type", "application/json")
    .send({
      email: user.email,
      password: passwordBeforeHash,
    })

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    message: "OK",
  })
})

test("realiza um login com email inválido", async () => {
  await server.ready() // espera o servidor registrar todos os módulos para então executar

  const { user, passwordBeforeHash } = await makeUser()

  const response = await request(server.server)
    .post("/sessions")
    .set("Content-Type", "application/json")
    .send({
      email: "emailInvalido@email.com",
      password: passwordBeforeHash,
    })

  expect(response.status).toEqual(400)
  expect(response.body).toEqual({
    message: "Credenciais inválidas",
  })
})

test("realiza um login com senha inválida", async () => {
  await server.ready() // espera o servidor registrar todos os módulos para então executar

  const { user, passwordBeforeHash } = await makeUser()

  const response = await request(server.server)
    .post("/sessions")
    .set("Content-Type", "application/json")
    .send({
      email: user.email,
      password: "senhaInválida",
    })

  expect(response.status).toEqual(400)
  expect(response.body).toEqual({
    message: "Credenciais inválidas",
  })
})
