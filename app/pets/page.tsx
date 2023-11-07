import { getEnemyPets } from '@/app/actions/pet';
import Image from 'next/image';
import React from 'react';

export default async function Page() {
  const pets = await getEnemyPets();

  return (
    <div>
      <div className="aspect-video bg-gradient-to-t from-gray-100 overflow-hidden border rounded-3xl relative">
        <Image
          src={`/monsters/monster-4.svg`}
          width={80}
          height={80}
          className="absolute z-10 bottom-8 left-1/2 -translate-x-1/2"
          alt=""
        />
        <p className="px-4 py-2 text-sm z-10 rounded-full shadow-sm bg-white border absolute bottom-32 left-1/2 -translate-x-1/2">
          ヤッホー
        </p>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-stone-600"></div>
      </div>

      {pets.map((pet) => (
        <li key={pet.id}>{pet.name}</li>
      ))}
    </div>
  );
}
