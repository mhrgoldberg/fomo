import type { NextApiRequest, NextApiResponse } from "next"
import { redirect } from "next/dist/server/api-utils"
import { postUsersController } from "../../lib/users/controller"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return postUsersController(req, res)
  }
  return redirect(res, "/")
}
