import { getServerSession } from 'next-auth/next';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { supabase } from './supabase';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/business.manage',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          // Store user in Supabase
          const { data, error } = await supabase
            .from('users')
            .upsert([
              {
                google_id: user.id,
                email: user.email!,
                name: user.name!,
                access_token: account.access_token!,
                refresh_token: account.refresh_token || '',
              }
            ])
            .select();

          if (error) {
            console.error('Error storing user:', error);
            return false;
          }

          return true;
        } catch (error) {
          console.error('Sign in error:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      // Add user ID to session
      if (session.user) {
        const { data } = await supabase
          .from('users')
          .select('id')
          .eq('email', session.user.email)
          .single();
        
        if (data) {
          session.user.id = data.id;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};

export const getSession = () => getServerSession(authOptions);