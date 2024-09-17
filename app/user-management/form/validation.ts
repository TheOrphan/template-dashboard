import { z } from 'zod';

export const userValidation = () =>
  z.object({
    name: z.string().min(1, { message: 'user.name-mandatory' }),
    email: z.string().email({ message: 'user.email-mandatory' }),
    role: z.string().min(1, { message: 'user.role-mandatory' }),
  });
