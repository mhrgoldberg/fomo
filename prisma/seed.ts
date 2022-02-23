import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Mitchell",
    email: "mhrgoldberg@gmail.com",
    password: "123456",
  },
  {
    name: "Nilu",
    email: "nilu@prisma.io",
    password: "123456",
  },
  {
    name: "Mahmoud",
    email: "mahmoud@prisma.io",
    password: "123456",
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
