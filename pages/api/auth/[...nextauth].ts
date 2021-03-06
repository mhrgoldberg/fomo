import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import prisma from "../../../lib/db"
import { checkPassword, getUser } from "../../../lib/users/util"

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/sign-in",
    // error: "/auth/error",
    newUser: "/auth/sign-up",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  theme: { colorScheme: "light", brandColor: "#4527a0" },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // confirm form validations
        if (!credentials?.email || !credentials?.password) return null
        // confirm user exists
        const user = await getUser(credentials.email)
        // confirm password is valid
        if (!user?.password) return null
        const valid = await checkPassword(credentials.password, user.password)
        if (!valid) return null
        // return user in the case that all checks have passed
        return user
      },
    }),
  ],
})
