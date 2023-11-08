import { dataURLtoBuffer } from '@/lib/utils';
import { PrismaClient } from '@prisma/client';
import { put } from '@vercel/blob';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export const db = prisma;

export const putImage = async (dataUrl: string, pathname: string) => {
  const file = dataURLtoBuffer(dataUrl);
  const blob = await put(pathname, file, {
    access: 'public',
  });

  return blob.url;
};
