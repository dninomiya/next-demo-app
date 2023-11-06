'use server';

import { authGuard } from '@/app/actions/auth';
import { db } from '@/app/actions/lib';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const PetSchema = z.object({
  name: z.string().max(240),
  avatarId: z.string(),
});

export const createPet = async (formData: FormData) => {
  const ownerId = authGuard();
  const validatedData = PetSchema.parse({
    name: formData.get('name'),
    avatarId: formData.get('avatarId'),
  });

  await db.pet.create({
    data: {
      ...validatedData,
      ownerId,
    },
  });

  revalidatePath('/');
};

export const updatePet = async (id: string, formData: FormData) => {
  const uid = authGuard();
  const validatedData = PetSchema.parse({
    name: formData.get('name'),
    avatarId: formData.get('avatarId'),
  });

  await db.pet.update({
    where: {
      id,
      ownerId: uid,
    },
    data: validatedData,
  });

  revalidatePath('/');
};

export const deletePet = async (id: string) => {
  const uid = authGuard();

  await db.pet.delete({
    where: {
      id,
      ownerId: uid,
    },
  });

  revalidatePath('/');
};

export const getEnemyPets = async () => {
  const uid = authGuard();

  return db.pet.findMany({
    take: 10,
    where: {
      ownerId: {
        not: uid,
      },
    },
  });
};

export const attackEnemey = async (id: string) => {
  authGuard();

  await db.pet.update({
    where: {
      id,
    },
    data: {
      health: {
        decrement: 10,
      },
    },
  });

  revalidatePath('/');
};
