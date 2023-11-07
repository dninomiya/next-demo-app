'use server';

import { authGuard } from '@/app/actions/auth';
import { db } from '@/app/actions/lib';
import { Prisma } from '@prisma/client';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const PostSchema = z.object({
  title: z.string().max(240),
  body: z.string().max(140),
});

export const createPost = async (formData: FormData) => {
  const authorId = authGuard();
  const validatedData = PostSchema.parse({
    title: formData.get('title'),
    body: formData.get('body'),
  });
  let thumbnailURL;

  const file = formData.get('thumbnail') as File;

  if (file) {
    const blob = await put(file.name, file, {
      access: 'public',
    });
    thumbnailURL = blob.url;
  }

  await db.post.create({
    data: {
      ...validatedData,
      thumbnailURL: thumbnailURL || undefined,
      authorId,
    },
  });

  revalidatePath('/');
  redirect('/');
};

export const updatePost = async (
  id: string,
  file: File | undefined,
  formData: FormData
) => {
  const uid = authGuard();
  const validatedData = PostSchema.parse({
    name: formData.get('name'),
    avatarId: formData.get('avatarId'),
  });
  const newData: Prisma.PostUncheckedUpdateInput = validatedData;

  if (file) {
    const blob = await put(file.name, file, {
      access: 'public',
    });
    newData.thumbnailURL = blob.url;
  }

  await db.post.update({
    where: {
      id,
      authorId: uid,
    },
    data: newData,
  });

  revalidatePath('/');
};

export const deletePost = async (id: string) => {
  const uid = authGuard();

  await db.post.delete({
    where: {
      id,
      authorId: uid,
    },
  });

  revalidatePath('/');
};

export const getPost = async (id: string) => {
  return db.post.findFirst({
    where: {
      id,
    },
  });
};

export const getPosts = async () => {
  return db.post.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getPostCount = async () => {
  return db.post.count();
};
