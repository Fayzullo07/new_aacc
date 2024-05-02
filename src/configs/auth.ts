import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const config = {
    pages: {
        signIn: '/uz/login',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                login: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
            },
            authorize(c: any) {
                if (c.password != '12345') return null;
                const user = { id: "1", name: c.login, role: "admin77", password: c.password }
                return user
            },
        }),
    ],
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl
            console.log("pathname", pathname);


            if (pathname === "/uz/admin" || pathname === "/ru/admin" || pathname === "/en/admin") return !!auth
            return true
        },
        jwt({ token, trigger, session }) {
            if (trigger === "update") token.name = session.user.name
            return token
        },
    },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)