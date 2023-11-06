import { attackEnemey, getEnemyPets } from '@/app/actions/pet';
import { currentUser } from '@/app/actions/user';
import Image from 'next/image';
import React from 'react';

export default async function Page() {
  const user = await currentUser();
  const pet = user.pets[0];
  const enemyPets = await getEnemyPets();
  const health = Math.max(pet.health, 0);

  const status = () => {
    if (health === 0) {
      return '死んでいます';
    } else if (health < 70) {
      return '傷ついています';
    } else if (health < 10) {
      return '瀕死です';
    }
    return '元気です';
  };

  return (
    <div className="text-center">
      <h1 className="mb-4 font-bold text-2xl">こんにちは {user.name} さん</h1>
      <Image
        src={`/monster${pet.avatarId}.png`}
        alt=""
        width={160}
        height={160}
        className="rounded-2xl border mb-6 block mx-auto"
      />
      <div className="w-80 mx-auto rounded-2xl overflow-hidden mb-3 bg-gray-100">
        <div
          className="w-full h-5 bg-green-600 origin-left transition"
          style={{
            transform: `scaleX(${health / 100})`,
          }}
        ></div>
      </div>
      <p>
        {pet.name} は{status()}。
      </p>

      {enemyPets?.length === 0 ? (
        <p className="text-center text-muted-foreground bg-muted p-4 border rounded-lg mt-10">
          生き残っている他の人のペットはいません。
        </p>
      ) : (
        <div>
          <h2>攻撃可能な他の人のペット</h2>
          <div className="grid grid-cols-4">
            {enemyPets.map((enemyPet) => (
              <div key={enemyPet.id} className="relative">
                <Image
                  src={`/monster${enemyPet.avatarId}.png`}
                  alt=""
                  width={160}
                  height={160}
                  className="rounded-2xl border mb-6 block mx-auto"
                />
                <p>{enemyPet.name}</p>
                <form>
                  <button
                    className="absolute inset-0"
                    formAction={attackEnemey.bind(null, enemyPet.id)}
                  />
                </form>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
