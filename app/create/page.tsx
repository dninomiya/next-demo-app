import { createPost } from '@/app/actions/post';
import SubmitButton from '@/app/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { faker } from '@faker-js/faker';

export default function Page() {
  return (
    <form action={createPost} className="space-y-6">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="thumbnail">カバー画像</Label>
        <Input
          id="thumbnail"
          name="thumbnail"
          defaultValue=""
          type="file"
          accept="image/png,image/jpeg"
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">タイトル*</Label>
        <Input
          type="text"
          id="title"
          defaultValue={faker.lorem.sentence()}
          required
          name="title"
        />
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="body">本文*</Label>
        <Textarea
          maxLength={140}
          name="body"
          placeholder=""
          defaultValue={faker.lorem.paragraphs(4, '\n\n')}
          id="body"
          required
        />
      </div>
      <div>
        <SubmitButton>作成</SubmitButton>
      </div>
    </form>
  );
}
