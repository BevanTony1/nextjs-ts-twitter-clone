// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

type Data = {
  name: string
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  try {
    const posts = await prisma.post.findMany({
      include: {
        User: {
          select: {
            name: true,
            email: true,
            image: true,
            id: true
          },
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }

    });
    res.status(200).json({ posts })
  } catch (err) {
    console.log(err);
  }

}