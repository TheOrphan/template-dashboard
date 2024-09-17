'use server';

import { IUser } from '@/lib/auth/interfaces';
import { optionsAppJson } from '@/utils/server.helpers';

export async function addUser(reqBody: IUser) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/users`, {
      method: 'POST',
      headers: (await optionsAppJson()).headers,
      body: JSON.stringify(reqBody),
    });

    if (!res.ok) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export async function editUser(reqBody: IUser) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/users/${reqBody._id}`, {
      method: 'PUT',
      headers: (await optionsAppJson()).headers,
      body: JSON.stringify(reqBody),
    });

    if (!res.ok) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteUser(reqBody: IUser) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/users/${reqBody._id}`, {
      method: 'DELETE',
      headers: (await optionsAppJson()).headers,
    });

    if (!res.ok) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
