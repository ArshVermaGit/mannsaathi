import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!
    })
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
    // We handle the anonymous migration via a separate API call from the client
    // after a successful login, rather than blocking the sign-in callback.
    async signIn({ user, account }) {
      return true
    }
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in" // For simplicity, redirect errors back to sign-in
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  }
})
