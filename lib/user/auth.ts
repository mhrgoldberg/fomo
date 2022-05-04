import { Prisma, User } from "@prisma/client"
import bcrypt from "bcrypt"
import prisma from "../db"
// crteate user and hash password
type NewUserSubmission = {
  name: string
  email: string
  password: string
  image: string
}

export async function createUserWithPassword({
  name,
  password,
  email,
  image,
}: NewUserSubmission): Promise<User> {
  console.log(name, password, email, image)
  const newUser: Prisma.UserCreateInput = { name, password, email }
  if (image) newUser.image = image

  newUser.password = await bcrypt.hash(password, 10)
  return prisma.user.create({ data: newUser })
}
export async function getUser(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } })
}

export async function checkPassword(password: string, hash: string): Promise<boolean> {
  const res = await bcrypt.compare(password, hash)
  return res
}
