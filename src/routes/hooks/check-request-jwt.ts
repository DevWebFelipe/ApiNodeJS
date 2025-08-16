import type { FastifyRequest, FastifyReply } from "fastify"
import jwt from "jsonwebtoken"

export async function checkRequestJWT(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return reply.status(401).send()
  }

  const token = authHeader.replace("Bearer ", "").trim()

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be set.")
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    console.log(payload)
    return
  } catch {
    return reply.status(401).send()
  }
}
