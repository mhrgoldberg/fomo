import { Prisma, PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Mitchell",
    email: "m@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Zaviar",
    email: "z@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Demo",
    email: "demo@demo.com",
    password: bcrypt.hashSync("123456", 10),
  },
]

async function main() {
  // eslint-disable-next-line no-console
  console.log(`Start seeding ...`)
  userData.forEach(async (u) => {
    const user = await prisma.user.create({
      data: u,
    })
    // eslint-disable-next-line no-console
    console.log(`Created user with id: ${user.id}`)
  })
  // eslint-disable-next-line no-console
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
