import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { AuthOptions } from "next-auth"
import prisma from "@/lib/prismadb"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bycrypt from "bcrypt"
import NextAuth from "next-auth/next"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "pas",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password)
          throw new Error("Invalid credentials")

        const user = await prisma.user.findUnique({
          where: {
            emaill: credentials.email,
          },
        })

        if (!user || !user?.hashedPassword)
          throw new Error("Invalid credentials")

        const isPasswordCorrect = await bycrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isPasswordCorrect) throw new Error("Invalid credentials")

        return user
      },
    }),
  ],

  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
