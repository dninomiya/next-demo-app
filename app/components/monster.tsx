import { Pet } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

export default function Monster({ pet }: { pet: Pet }) {
  return (
    <Image
      src={`/monsters/monster-${pet.avatarId}.svg`}
      alt=""
      width={120}
      height={120}
      className="block"
    />
  );
}
