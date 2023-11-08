'use server';

import { authGuard } from '@/app/actions/auth';
import { db } from '@/app/actions/lib';
import { clerkClient } from '@clerk/nextjs';
import { Prisma } from '@prisma/client';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().max(240),
});

export const currentUser = async () => {
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
};

export const createUser = async (formData: FormData) => {
  const uid = authGuard();
  const validatedData: Prisma.UserUncheckedUpdateInput = UserSchema.parse({
    name: formData.get('name'),
  });

  const file = formData.get('profileImage') as File;

  if (file?.size > 0) {
    const blob = await put(`profileImage/${uid}/${file.name}`, file, {
      access: 'public',
    });
    validatedData.profileImageURL = blob.url;
  }

  await db.user.create({
    data: {
      ...validatedData,
      id: uid,
    },
  });

  await clerkClient.users.updateUserMetadata(uid, {
    publicMetadata: {
      onboarded: true,
    },
  });

  revalidatePath('/');
};

export const updateUser = async (formData: FormData) => {
  const uid = authGuard();
  const validatedData = UserSchema.parse({
    name: formData.get('name'),
  });

  await db.user.update({
    where: {
      id: uid,
    },
    data: validatedData,
  });

  revalidatePath('/');
};

export const deleteUser = async () => {
  const uid = authGuard();

  await db.user.delete({
    where: {
      id: uid,
    },
  });

  revalidatePath('/');
};
