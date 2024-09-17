'use server';

import { IProduct } from '../interfaces';
import { optionsAppJson } from '@/utils/server.helpers';

export async function addProduct(reqBody: IProduct) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/products`, {
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

export async function editProduct(reqBody: IProduct) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/products/${reqBody._id}`, {
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

export async function deleteProduct(reqBody: IProduct) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/products/${reqBody._id}`, {
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
