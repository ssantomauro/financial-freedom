import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      hasLifetimeAccess: boolean
      subscriptionDate: Date | null
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
    image?: string | null
    hasLifetimeAccess?: boolean
    subscriptionDate?: Date | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    hasLifetimeAccess: boolean
    subscriptionDate: Date | null
  }
}
