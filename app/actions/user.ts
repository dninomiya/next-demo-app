'use server';

import { authGuard } from '@/app/actions/auth';
import { db, putImage } from '@/app/actions/lib';
import { clerkClient } from '@clerk/nextjs';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().max(240),
});

export const currentUser = cache(async () => {
  const uid = authGuard();
  const user = await db.user.findUnique({
    where: {
      id: uid,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
});

export const createUser = async (formData: FormData) => {
  const id = authGuard();
  const validatedData = UserSchema.parse({
    name: formData.get('name'),
  });

  const data: Prisma.UserUncheckedCreateInput = {
    ...validatedData,
    id,
  };

  const profileImageDataURL = formData.get('profileImage') as string;

  if (profileImageDataURL) {
    data.profileImageURL = await putImage(
      profileImageDataURL,
      `profileImage/${id}/image.png`
    );
  }

  await db.user.create({
    data,
  });

  await clerkClient.users.updateUserMetadata(id, {
    publicMetadata: {
      onboarded: true,
    },
  });

  revalidatePath('/');
  redirect('/');
};

export const updateUser = async (formData: FormData) => {
  const id = authGuard();
  const validatedData = UserSchema.parse({
    name: formData.get('name'),
  });
  const data: Prisma.UserUncheckedUpdateInput = {
    ...validatedData,
  };

  const profileImageDataURL = formData.get('profileImage') as string;

  if (profileImageDataURL) {
    data.profileImageURL = await putImage(
      profileImageDataURL,
      `profileImage/${id}/image.png`
    );
  }

  await db.user.update({
    where: {
      id,
    },
    data,
  });

  revalidatePath('/');
};

export const deleteUser = async () => {
  const id = authGuard();

  await db.user.delete({
    where: {
      id,
    },
  });

  revalidatePath('/');
};
