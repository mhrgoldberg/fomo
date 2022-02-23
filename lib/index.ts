import prisma from "./db"

export default async function helloWorld(name: string): Promise<string> {
  const user = await prisma.user.findFirst({
    where: { name: { contains: name, mode: "insensitive" } },
  })
  if (user) {
    return `Hello World, ${user.name}, ${user.email}!`
  }
  return `user not found`
}
