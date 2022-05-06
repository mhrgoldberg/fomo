import Joi from "joi"

export type NewUserSubmission = {
  name: string
  email: string
  password: string
  image: string
}

export default function validatePostUser(body: NewUserSubmission): Joi.ValidationResult {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    image: Joi.string().domain().empty().default("/profile.jpg"),
  })

  const res = schema.validate(body)
  return res
}
