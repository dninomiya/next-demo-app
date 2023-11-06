import { createUser } from '@/app/actions/user';
import SubmitButton from '@/app/onboarding/submit-button';
import { faker } from '@faker-js/faker';

export default function UserForm() {
  return (
    <form action={createUser}>
      <h1 className="font-bold text-xl mb-4">ユーザーを作成する</h1>

      <div className="p-8 border rounded-xl shadow-sm">
        <h2>ユーザーを作成</h2>
        <p className="text-muted-foreground mb-6">いつでも消せます</p>

        <h3>名前</h3>
        <input
          name="name"
          defaultValue={faker.internet.userName()}
          className="border rounded-md px-2 py-1"
          type="text"
          required
        />
      </div>

      <SubmitButton>ユーザーを作成する</SubmitButton>
    </form>
  );
}
