import NextAuth, { NextAuthConfig } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/db/prisma"
import bcrypt from "bcryptjs"
import { sendNewUserNotification } from "@/lib/email/mailer"

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.password) {
          return null
        }

        // Check if email is verified (only for email/password login)
        if (!user.emailVerified) {
          return null
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!passwordMatch) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Handle Google OAuth sign in
      if (account?.provider === "google") {
        try {
          // Check if user already exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          })

          if (existingUser) {
            // Update user ID to match existing user
            user.id = existingUser.id

            // Create or update account link
            await prisma.account.upsert({
              where: {
                provider_providerAccountId: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                },
              },
              update: {
                access_token: account.access_token,
                expires_at: account.expires_at,
                refresh_token: account.refresh_token,
                id_token: account.id_token,
              },
              create: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                refresh_token: account.refresh_token,
                id_token: account.id_token,
              },
            })
          } else {
            // Create new user
            const newUser = await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name,
                image: user.image,
                emailVerified: new Date(),
              },
            })

            user.id = newUser.id

            // Create account link
            await prisma.account.create({
              data: {
                userId: newUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                refresh_token: account.refresh_token,
                id_token: account.id_token,
              },
            })

            // Send admin notification for new user (non-blocking)
            try {
              await sendNewUserNotification({
                email: user.email!,
                name: user.name,
                signupMethod: 'Google OAuth',
              })
            } catch (emailError) {
              console.error('Failed to send admin notification:', emailError)
              // Don't fail the signup if admin email fails to send
            }
          }
        } catch (error) {
          console.error("Error in signIn callback:", error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user }) {
      // On sign in, set the user ID
      if (user) {
        token.id = user.id
      }

      // Always fetch latest subscription status from database
      // This ensures session.update() gets the latest data
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: {
            hasLifetimeAccess: true,
            subscriptionDate: true,
          },
        })

        token.hasLifetimeAccess = dbUser?.hasLifetimeAccess || false
        token.subscriptionDate = dbUser?.subscriptionDate || null
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.hasLifetimeAccess = token.hasLifetimeAccess as boolean
        session.user.subscriptionDate = token.subscriptionDate as Date | null
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)

export const GET = handlers.GET
export const POST = handlers.POST
