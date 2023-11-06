import { auth } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();
