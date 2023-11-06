import { createPet } from '@/app/actions/pet';
import SubmitButton from '@/app/onboarding/submit-button';
import { faker } from '@faker-js/faker';
import Image from 'next/image';

export default function PetForm() {
  const monsters = new Array(10).fill(0).map((_, i) => i + 1);

  return (
    <form action={createPet}>
      <div className="p-8 border rounded-xl shadow-sm">
        <h2>ペットを作成</h2>
        <p className="text-muted-foreground mb-6">いつでも消せます</p>

        <h3 className="font-bold text-lg mb-2">種族</h3>
        <p className="text-muted-foreground mb-6">
          それぞれ緻密に計算された個体値を持っています
        </p>
        <ul className="grid gap-6 grid-cols-4">
          {monsters.map((monster) => (
            <li key={monster}>
              <label className="cursor-pointer">
                <input
                  name="avatarId"
                  type="radio"
                  className="peer hidden"
                  value={monster}
                  defaultChecked={monster === 1}
                />
                <Image
                  src={`/monster${monster}.png`}
                  className="border rounded-2xl shadow transition hover:shadow-lg peer-checked:ring-2"
                  alt=""
                  width={140}
                  height={140}
                />
              </label>
            </li>
          ))}
        </ul>

        <h3 className="font-bold text-lg mb-2 mt-10">名前</h3>
        <p className="text-muted-foreground mb-6">強そうな名前を考えましょう</p>
        <div className="mb-10">
          <input
            name="name"
            defaultValue={faker.internet.userName()}
            className="border rounded-md px-2 py-1"
            type="text"
            required
          />
        </div>
      </div>

      <SubmitButton>ユーザーを作成する</SubmitButton>
    </form>
  );
}
