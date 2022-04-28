import { Prisma, User } from "@prisma/client"
import bcrypt from "bcrypt"
import prisma from "../db"
// crteate user and hash password
export async function createUserWithPassword(
  name: string,
  password: string,
  email: string,
  image: string
): Promise<User> {
  const newUser: Prisma.UserCreateInput = { name, password, email }
  if (image) newUser.image = image

  newUser.password = await bcrypt.hash(password, 10)
  return prisma.user.create({ data: newUser })
}
export async function getUser(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } })
}

export async function checkPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
