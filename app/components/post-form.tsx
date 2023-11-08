import { createPost, getOwnPost, updatePost } from '@/app/actions/post';
import SubmitButton from '@/app/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { faker } from '@faker-js/faker';
import Image from 'next/image';

export default async function PostForm({ editId }: { editId?: string }) {
  const oldPost = editId ? await getOwnPost(editId) : null;

  const defaultValue = oldPost
    ? {
        title: oldPost.title,
        body: oldPost.body,
      }
    : {
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(4, '\n\n'),
      };

  return (
    <form
      action={editId ? updatePost.bind(null, editId) : createPost}
      className="space-y-6"
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="thumbnail">カバー画像</Label>
        {oldPost?.thumbnailURL && (
          <div className="aspect-video relative">
            <Image
              src={oldPost.thumbnailURL}
              className="object-cover"
              sizes="800pxx"
              alt=""
              fill
            />
          </div>
        )}
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
          defaultValue={defaultValue.title}
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
          defaultValue={defaultValue.body}
          id="body"
          required
        />
      </div>
      <div>
        <SubmitButton>{editId ? '更新' : '作成'}</SubmitButton>
      </div>
    </form>
  );
}
