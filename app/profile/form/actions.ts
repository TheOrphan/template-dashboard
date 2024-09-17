'use server';

import { optionsAppJson } from '@/utils/server.helpers';
import { IChangePassword } from '../interface';

export async function changePassword({
  user_id,
  reqBody,
}: {
  user_id: string;
  reqBody: IChangePassword;
}) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/users/${user_id}/password`, {
      method: 'PUT',
      headers: (await optionsAppJson()).headers,
      body: JSON.stringify({
        currentPassword: reqBody.confirmPassword,
        newPassword: reqBody.newPassword,
      }),
    });
    if (!res.ok) {
      const response = await res.json();
      return { status: false, message: response.message.message };
    }
    return { status: true };
  } catch (error) {
    return { status: false };
  }
}
