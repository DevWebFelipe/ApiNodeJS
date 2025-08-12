import fastify from "fastify"
import crypto from 'node:crypto'


const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hosname',
      },
    },
  },
})

const courses = [
  { id: '1', title: 'Curso de Node.js' },
  { id: '2', title: 'Curso de React' },
  { id: '3', title: 'Curso de React Native' },
]

server.get('/courses', () => {
  return { courses }
})

server.get('/courses/:id', (request, reply) => { 
  type Params = {
    id: string
  }
  
  const params = request.params as Params
  const courseId = params.id 

  const course = courses.find(course => course.id === courseId)

  if (course) {
    return { course }
  }

  return reply.status(404).send('Registro não encontrado!')
})

server.put('/courses/:id', (request, reply) => {
  type Params = { id: string }
  type Body = { title: string }

  const params = request.params as Params
  const body = request.body as Body
  const courseId = params.id
  const title = body.title


  const courseIndex = courses.findIndex(course => course.id === courseId)

  if (courseIndex === -1) {
    return reply.status(404).send({ message: 'Registro não encontrado!' })
  }

  if (!title) {
    return reply.status(400).send({ message: 'Obrigatório informar um título!' })
  }

  courses[courseIndex].title = title

  return reply.send({ message: 'Curso atualizado com sucesso!' })
})

server.post('/courses', (request, reply) => {
  type Body = {
    title: string
  }

  const courseId = crypto.randomUUID()
  const body = request.body as Body
  const courseTitle = body.title

  if (!courseTitle) {
    return reply.status(400).send({ message: 'Obrigatório informar um título!' })
  }

  courses.push({ id: courseId, title: courseTitle })

  return reply.status(201).send({ courseId })
})

server.delete('/courses/:id', (request, reply) => {
  type Params = { id: String }

  const params = request.params as Params
  const courseId = params.id

  const courseIndex = courses.findIndex(course => course.id === courseId)

  if (courseIndex === -1) {
    return reply.status(404).send({ message: 'Registro não encontrado!' })
  }

  courses.splice(courseIndex, 1)

  return reply.send({ message: 'Curso excluído com sucesso!' })
})

server.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})