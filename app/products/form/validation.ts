import { z } from 'zod';

export const productValidation = (t: any) =>
  z.object({
    name: z.string().min(1, { message: t('product.name-mandatory') }),
    description: z.string().min(1, { message: t('product.description-mandatory') }),
  });
