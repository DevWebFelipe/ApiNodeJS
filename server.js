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

server.get('/courses/:id', (request, reply) => {
  // const { id } = request.params
  const courseId = request.params.id // Da para fazer dos dois jeitos

  const course = courses.find(course => course.id === courseId)

  if (course) {
    return { course }
  }

  return reply.status(404).send('Registro não encontrado!')
})

server.post('/courses', (request, reply) => {
  const courseId = crypto.randomUUID()
  const courseTitle = request.body.title

  if (!courseTitle) {
    return reply.status(400).send({ message: 'Obrigatório informar um título!' })
  }

  courses.push({ id: courseId, title: courseTitle })

  return reply.status(201).send({ courseId })
})

server.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})