import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse,) {
    const userId = req.query.userId;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: String(userId)
            }
        })
        res.status(200).json({ user })

    } catch (err) {
        res.status(400).json({ message: 'Something went wrong' + err })
    }
}