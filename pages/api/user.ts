import { Prisma, User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import Joi from "joi"
import { redirect } from "next/dist/server/api-utils"
import { createUserWithPassword } from "../../lib/user/auth"

type SignUpError = {
  message: string
  success: false
  errors: {
    [key: string]: string
  }
}

type UserData = { name: string; email: string; password: string; image: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | SignUpError>
) {
  if (req.method === "POST") {
    const schema = Joi.object({
      name: Joi.string().min(2).required(),
      password: Joi.string().min(6).required(),
      email: Joi.string().email().required(),
      image: Joi.string().domain().empty().default("/profile.jpg"),
    })

    const { error, value } = schema.validate(req.body)

    const formatErrors = (errors: Joi.ValidationErrorItem[]) =>
      errors.reduce((acc, err) => {
        acc[err.path.toString()] = err.message.replace(/['"]/g, "")
        return acc
      }, {} as { [key: string]: string })

    if (error) {
      return res.status(400).json({
        message: "Invalid data",
        success: false,
        errors: formatErrors(error.details),
      })
    }
    try {
      if (value) {
        const user = await createUserWithPassword(value as UserData)
        return res.status(201).json(user)
      }
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
  return redirect(res, "/")
}
