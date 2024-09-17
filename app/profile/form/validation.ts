import { z } from 'zod';

export const changePasswordValidation = () =>
  z
    .object({
      oldPassword: z.string().min(6, { message: 'user.oldPassword-mandatory' }),
      newPassword: z.string().min(6, { message: 'user.newPassword-mandatory' }),
      confirmPassword: z.string().min(6, { message: 'user.confirmPassword-mandatory' }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: 'general.password-not-match',
      path: ['confirmPassword'],
    });
