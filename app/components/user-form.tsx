import { createUser, currentUser, updateUser } from '@/app/actions/user';
import SubmitButton from '@/app/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { faker } from '@faker-js/faker';

export default async function UserForm({ editMode }: { editMode?: boolean }) {
  const defaultValue = editMode
    ? {
        name: faker.internet.userName(),
      }
    : {
        name: (await currentUser()).name,
      };

  return (
    <form action={editMode ? updateUser : createUser}>
      <h1 className="font-bold text-xl mb-4">
        プロフィールを{editMode ? '更新' : '作成'}する
      </h1>

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
            defaultValue={defaultValue.name}
            required
            name="name"
          />
        </div>

        <SubmitButton>ユーザーを作成する</SubmitButton>
      </div>
    </form>
  );
}
