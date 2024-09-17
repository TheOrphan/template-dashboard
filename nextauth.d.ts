import { IUser as UserData } from '@/lib/auth/interfaces';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    userData?: UserData;
    accessToken?: string;
    error?: string;
  }

  interface CustomUser extends UserData {}
  interface User extends CustomUser {}
}
