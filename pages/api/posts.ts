// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, session } from 'next-auth/client'
import prisma from '../../lib/prisma'

type Data = {
  name: string
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  try {
    const session = await getSession({ req })
    const users = await prisma.relationship.findMany({
      where: {
        userId: session?.user.id
      },
      select: {
        followedId: true,
        userId: true
      }
    })

    const findId = users.map(x => x.followedId);
    findId.push(session?.user.id)



    const posts = await prisma.post.findMany({
      where: {
        userId: {
          in: findId
        },

      },
      include: {
        User: {
          select: {
            name: true,
            email: true,
            image: true,
            id: true
          },
        },

      },
      orderBy: {
        updatedAt: 'desc'
      }

    });
    res.status(200).json({ posts, findId })
  } catch (err) {
    console.log(err);
  }

}