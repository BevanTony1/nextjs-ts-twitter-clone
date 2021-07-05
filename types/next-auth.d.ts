import NextAuth from "next-auth"


declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
     */
    interface Session {
        user: {
            id?: string | number | any
            name?: string
            email?: string
            image?: string
        }
    }
}
/**
* The shape of the user object returned in the OAuth providers' `profile` callback,
* or the second parameter of the `session` callback, when using a database.
*/


/**
 * Usually contains information about the provider being used
 * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
 */
interface Account {
    id: number

}
/** The OAuth profile returned from your provider */
interface Profile { }

