'use client';

import { setCookie } from 'cookies-next';
import { signOut } from 'next-auth/react';

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (response.status === 401) {
    setCookie('token-error', 'Token expired');
    await signOut();
  }
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    (error as any).info = await response.json();
    (error as any).status = response.status;
    throw error;
  }
  return response.json();
};
