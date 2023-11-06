'use server';

import { auth } from '@clerk/nextjs';

export const authGuard = () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error('You must be signed in to add an item to your cart');
  }

  return userId;
};
