import { createUser } from '@/app/actions/user';
import SubmitButton from '@/app/onboarding/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { faker } from '@faker-js/faker';

export default function UserForm() {
  return (
    <form action={createUser}>
      <h1 className="font-bold text-xl mb-4">ユーザーを作成する</h1>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="profileIMage">プロフィール画像</Label>
        <Input
          id="profileIMage"
          name="profileIMage"
          defaultValue=""
          type="file"
          accept="image/png,image/jpeg"
        />
      </div>

      <div className="space-y-6">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">名前</Label>
          <Input
            type="text"
            id="name"
            defaultValue={faker.internet.userName()}
            required
            name="name"
          />
        </div>

        <SubmitButton>ユーザーを作成する</SubmitButton>
      </div>
    </form>
  );
}
