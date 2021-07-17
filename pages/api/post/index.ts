import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: any, res: any) {

    if (req.method === 'GET') {
        try {
            console.log('nag GET lugar ko?')
        } catch (err) {
            res.status(400).json({ messsage: 'Something went wrong' + err })
        }
    }

    if (req.method === 'POST') {
        try {
            const { text } = req.body;
            const session = await getSession({ req });
            const posts = await prisma.post.create({
                data: {
                    title: text,
                    userId: session?.user.id

                },
                include: {
                    User: true
                },

            });
            res.status(200).json({ ...posts });
        }
        catch (err) {
            res.status(400).json({ message: 'Something went wrong ' + err })
        }
    }
    if (req.method === 'PUT') {
        try {

            const { id, text } = req.body
            const result = await prisma.post.update({
                where: {
                    id: id
                },
                data: {
                    title: text
                }
            })
            res.status(200).json({ result });
        } catch (err) {
            res.status(400).json({ message: 'Something went wrong ' + err })
        }
    }

    if (req.method === 'DELETE') {
        try {

            const { id } = req.body
            const result = await prisma.post.delete({
                where: {
                    id: id
                }
            })
            res.status(200).json({ result })
        } catch (err) {
            res.status(400).json({ message: 'Something went wrong ' + err })
        }


    }
}