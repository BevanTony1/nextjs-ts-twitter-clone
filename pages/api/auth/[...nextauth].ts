import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import prisma from '../../../lib/prisma'

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        // ...add more providers here
    ],

    callbacks: {
        session(session, token) {
            // Add property to session, like an access_token from a provider.
            session.user.id = token.id
            return session
        }
    },
    adapter: PrismaAdapter(prisma),

    // A database is optional, but required to persist accounts in a database
    database: process.env.DATABASE_URL,
})