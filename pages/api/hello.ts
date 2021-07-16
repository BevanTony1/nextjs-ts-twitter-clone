// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

type Data = {
  name: string
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  const posts = await prisma.post.findMany()
  console.log(posts)

  res.json(posts)

}