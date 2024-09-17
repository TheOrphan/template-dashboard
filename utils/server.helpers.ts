'only server';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * Authenticates the user to the home.
 * @returns {Promise<void>}
 */
export async function authenticatedToHome() {
  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session;
  if (isAuthenticated) {
    redirect('/home');
  }
}

/**
 * Returns an object containing headers for making requests to the server with an access token.
 * @returns An object containing headers with an access token and headers without a token.
 */
export const optionsAppJson = async () => {
  const { accessToken } = (await getServerSession(authOptions)) || {};
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    headersWithoutToken: {
      'Content-Type': 'application/json',
    },
  };
};
