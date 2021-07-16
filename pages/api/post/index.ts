import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: any, res: any) {
    const { text } = req.body;
    const session = await getSession({ req });
    const result = await prisma.post.create({
        data: {
            title: text,
            userId: session?.user.id

        },
    });
    res.json(result);
}