import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import { SupabaseAdapter } from "@next-auth/supabase-adapter"

interface TokenWithRefresh {
  refreshToken?: string;
  [key: string]: unknown;
}

interface ExtendedSession {
  accessToken?: string;
  error?: string;
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
}

export default NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: [
            "openid",
            "email", 
            "profile",
            "https://www.googleapis.com/auth/business.manage"
          ].join(" "),
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Store the access token and refresh token in the JWT
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.accessTokenExpires = account.expires_at
      }
      
      if (user) {
        token.id = user.id
      }
      
      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number) * 1000) {
        return token
      }
      
      // Access token has expired, try to update it
      return await refreshAccessToken(token)
    },
    async session({ session, token }) {
      // Send properties to the client
      const extendedSession = session as ExtendedSession;
      if (token) {
        extendedSession.accessToken = token.accessToken as string
        extendedSession.error = token.error as string
        if (extendedSession.user) {
          extendedSession.user.id = token.id as string
        }
      }
      return extendedSession
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
})

async function refreshAccessToken(token: TokenWithRefresh) {
  try {
    const url = "https://oauth2.googleapis.com/token"
    
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken || '',
      }),
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}