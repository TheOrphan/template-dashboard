'only server';

import dayjs from 'dayjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import { IUser as CredentialUser, IToken } from './interfaces';

export const authOptions: NextAuthOptions = {
  pages: {
    error: '/login',
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@mail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) {
            return null;
          }
          const apiUrl = process.env.NEXT_API_URL! as string;
          const response = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
          });
          const resData = await response.json();
          if (response.status !== 201) {
            const { message } = resData;
            cookies().set({
              name: 'login-error',
              value: message,
              path: '/login',
            });
            throw new Error(message);
          }
          const { access_token, user: userData } = resData;
          const user = {
            user_id: userData.sub,
            ...userData,
            accessToken: access_token,
          } as CredentialUser;
          return { id: userData.sub, ...user };
        } catch (error: any) {
          cookies().set({
            name: 'login-error',
            value: error.toString(),
          });
          throw new Error(error);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 1 * 60 * 60,
  },
  jwt: {
    maxAge: dayjs().set('hour', 23).set('minute', 59).set('second', 59).diff(dayjs(), 'second'),
  },
  callbacks: {
    async jwt({ token, user }) {
      const updatedToken = { ...token };
      if (user) {
        const { accessToken, ...userData } = user as unknown as IToken;
        updatedToken.user = userData;
        updatedToken.accessToken = accessToken;
        return updatedToken;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      const updatedSession = { ...session };
      if (token) {
        updatedSession.userData = token.user as CredentialUser;
        updatedSession.accessToken = token.accessToken;
        updatedSession.error = token.error;
      }
      return Promise.resolve(updatedSession);
    },
  },
};
