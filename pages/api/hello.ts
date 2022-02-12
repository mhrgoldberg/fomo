// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import helloWorld from "../../lib"

type Data = {
  message: string
}

// http://localhost:3000/api/hello?name=Zaviar => { message: 'Hello World, Zaviar!' }
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ message: helloWorld(req.query.name as string) })
}
