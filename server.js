const fastify = require('fastify')
const crypto  = require('crypto')

const server = fastify()

const courses = [
  { id: '1', title: 'Curso de Node.js' },
  { id: '2', title: 'Curso de React' },
  { id: '3', title: 'Curso de React Native' },
]

server.get('/courses', () => {
  return { courses }
})

server.post('/courses', (request, reply) => {
  const courseId = crypto.randomUUID()

  courses.push({ id: courseId, title: 'Novo curso' })

  return reply.status(201).send({ courseId })
})

server.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})