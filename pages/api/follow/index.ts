import type { NextApiResponse, NextApiRequest } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { userId, ownerId } = req.body
            const session = await getSession({ req })
            const relationship = await prisma.relationship.create({
                data: {
                    followedId: String(userId),
                    userId: String(ownerId)
                },
                include: {
                    User: true
                },

            })
            res.status(200).json({ relationship })
        } catch (err) {
            res.status(400).json({ message: 'Something went wrong' })
        }
    }
}