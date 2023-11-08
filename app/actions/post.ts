'use server';

import { authGuard } from '@/app/actions/auth';
import { db } from '@/app/actions/lib';
import { Prisma } from '@prisma/client';
import { put } from '@vercel/blob';
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { z } from 'zod';

const PostSchema = z.object({
  title: z.string().max(240),
  body: z.string().max(140),
});

export const createPost = async (formData: FormData) => {
  const authorId = authGuard();
  const id = randomUUID();
  const validatedData = PostSchema.parse({
    title: formData.get('title'),
    body: formData.get('body'),
  });
  const newData: Prisma.PostUncheckedCreateInput = {
    ...validatedData,
    id,
    authorId,
  };

  const file = formData.get('thumbnail') as File;

  if (file?.size > 0) {
    const blob = await put(`posts/${id}/${file.name}`, file, {
      access: 'public',
    });
    newData.thumbnailURL = blob.url;
  }

  await db.post.create({
    data: newData,
  });

  revalidatePath('/');
  redirect('/');
};

export const updatePost = async (id: string, formData: FormData) => {
  const authorId = authGuard();
  const validatedData = PostSchema.parse({
    name: formData.get('name'),
    avatarId: formData.get('avatarId'),
  });
  const newData: Prisma.PostUncheckedUpdateInput = validatedData;

  const file = formData.get('thumbnail') as File;

  if (file) {
    const blob = await put(file.name, file, {
      access: 'public',
    });
    newData.thumbnailURL = blob.url;
  }

  await db.post.update({
    where: {
      id,
      authorId,
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
  redirect('/');
};

export const getPost = async (id: string) => {
  return db.post.findFirst({
    where: {
      id,
    },
  });
};

export const getOwnPost = async (id: string) => {
  const authorId = authGuard();

  return db.post.findFirst({
    where: {
      id,
      authorId,
    },
  });
};

export const getPosts = async () => {
  return db.post.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
    },
  });
};

export const getPostCount = async () => {
  return db.post.count();
};

export const hasLike = cache(async (id: string) => {
  const uid = authGuard();
  const post = await db.post.findFirst({
    where: {
      id,
      likes: {
        some: {
          id: uid,
        },
      },
    },
  });

  return !!post;
});

export const toggleLike = async (id: string) => {
  const uid = authGuard();
  const hasLike = await db.post.findFirst({
    where: {
      id,
      likes: {
        some: {
          id: uid,
        },
      },
    },
  });

  if (hasLike) {
    await db.post.update({
      where: {
        id,
      },
      data: {
        likes: {
          disconnect: {
            id: uid,
          },
        },
      },
    });
  } else {
    await db.post.update({
      where: {
        id,
      },
      data: {
        likes: {
          connect: {
            id: uid,
          },
        },
      },
    });
  }

  revalidatePath('/');
};

const getUserPosts = cache(async (id: string) => {
  return db.post.findMany({
    where: {
      authorId: id,
    },
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
    },
  });
});

export const getMyPosts = async () => {
  const uid = authGuard();
  const posts = await getUserPosts(uid);

  return posts;
};
