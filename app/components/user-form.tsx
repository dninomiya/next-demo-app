import { createUser, currentUser, updateUser } from '@/app/actions/user';
import ImageCropper from '@/app/components/image-cropper';
import SubmitButton from '@/app/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { faker } from '@faker-js/faker';

export default async function UserForm({ editMode }: { editMode?: boolean }) {
  const defaultValue = editMode
    ? {
        name: (await currentUser()).name,
      }
    : {
        name: faker.internet.userName(),
      };

  return (
    <form action={editMode ? updateUser : createUser}>
      <div className="space-y-6">
        <h1 className="font-bold text-xl mb-4">
          プロフィールを{editMode ? '更新' : '作成'}する
        </h1>

        <div className="space-y-1.5">
          <Label>プロフィール画像</Label>
          <div className="w-40">
            <ImageCropper name="profileImageURL" width={100} aspectRatio={1} />
          </div>
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
      </div>
    </form>
  );
}
