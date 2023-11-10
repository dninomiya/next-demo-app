import { dataURLtoBuffer } from '@/lib/utils';
import { PrismaClient } from '@prisma/client';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';

const client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_ACCESS_KEY as string,
  },
});

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export const db = prisma;

export const putImage = async (dataUrl: string, pathname: string) => {
  const file = dataURLtoBuffer(dataUrl);

  const uploadParams: PutObjectCommandInput = {
    Bucket: 'next-demo',
    Key: pathname,
    Body: file,
    ContentType: 'image/png',
    ACL: 'public-read',
  };

  const command = new PutObjectCommand(uploadParams);
  await client.send(command);

  return `${process.env.IMAGE_HOST_URL}/${pathname}`;
};
