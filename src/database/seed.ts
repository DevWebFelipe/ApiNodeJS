import { fakerPT_BR as faker } from "@faker-js/faker"
import { courses, enrollments, users } from "./schema.ts"
import { db } from "./client.ts"
import { hash } from "argon2"

async function seed() {
  const passwordHash = await hash("123456")

  const usersInsert = await db
    .insert(users)
    .values([
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: passwordHash,
        role: "student",
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: passwordHash,
        role: "student",
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: passwordHash,
        role: "student",
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: passwordHash,
        role: "student",
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: passwordHash,
        role: "student",
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: passwordHash,
        role: "student",
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: passwordHash,
        role: "student",
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: passwordHash,
        role: "student",
      },
    ])
    .returning()

  const coursesInsert = await db
    .insert(courses)
    .values([
      { title: faker.lorem.words(4) },
      { title: faker.lorem.words(4) },
      { title: faker.lorem.words(4) },
    ])
    .returning()

  await db.insert(enrollments).values([
    { courseId: coursesInsert[0].id, userId: usersInsert[0].id },
    { courseId: coursesInsert[0].id, userId: usersInsert[1].id },
    { courseId: coursesInsert[1].id, userId: usersInsert[2].id },
    { courseId: coursesInsert[1].id, userId: usersInsert[3].id },
    { courseId: coursesInsert[1].id, userId: usersInsert[4].id },
    { courseId: coursesInsert[2].id, userId: usersInsert[5].id },
    { courseId: coursesInsert[2].id, userId: usersInsert[6].id },
    { courseId: coursesInsert[2].id, userId: usersInsert[7].id },
  ])
}

seed()
