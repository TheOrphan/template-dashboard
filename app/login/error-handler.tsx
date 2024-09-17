'use client';

import { useEffect } from 'react';
import { deleteCookie, getCookie } from 'cookies-next';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

export default function LoginErrorHandler() {
  const error = getCookie('login-error');
  useEffect(() => {
    if (error) {
      notifications.show({
        id: 'login-error',
        withCloseButton: true,
        autoClose: 5000,
        title: 'Terjadi Kesalahan',
        message: error.toString(),
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
      deleteCookie('login-error', { path: '/login' });
    }
  }, [error]);
}
