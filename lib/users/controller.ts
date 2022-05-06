import type { NextApiRequest, NextApiResponse } from "next"
import { Prisma, User } from "@prisma/client"
import { createUserWithPassword } from "./util"
import validatePostUser from "./validation"
import formatErrors from "../formValidation"
import type { ErrorResponse } from "../createError"

type UserData = { name: string; email: string; password: string; image: string }
export type UserResponse = { user: User; success: true }

// eslint-disable-next-line
export async function postUsersController(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse | ErrorResponse>
) {
  // validate request and throw error if data is invalid
  const { error, value } = validatePostUser(JSON.parse(req.body))

  if (error) {
    return res.status(400).json({
      message: "Invalid data",
      success: false,
      errors: formatErrors(error.details),
    })
  }

  // create user with password and throw error if user already exists
  try {
    const user = await createUserWithPassword(value as UserData)
    return res.status(201).json({ user, success: true })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        return res.status(400).json({
          message: "Email already exists",
          success: false,
          errors: { email: "Email already exists" },
        })
      }
      return res.status(400).json({
        message: "Error Creating User",
        success: false,
        errors: { form: "Try again later" },
      })
    }
  }
}
