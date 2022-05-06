import Joi from "joi"

export default function formatErrors(errors: Joi.ValidationErrorItem[]) {
  return errors.reduce((acc, err) => {
    acc[err.path.toString()] = err.message.replace(/['"]/g, "")
    return acc
  }, {} as { [key: string]: string })
}
