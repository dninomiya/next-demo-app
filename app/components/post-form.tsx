import {
  createPost,
  deletePost,
  getOwnPost,
  updatePost,
} from '@/app/actions/post';
import ImageCropper from '@/app/components/image-cropper';
import SubmitButton from '@/app/components/submit-button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { faker } from '@faker-js/faker';
import Image from 'next/image';

export default async function PostForm({ editId }: { editId?: string }) {
  const oldPost = editId ? await getOwnPost(editId) : null;

  const defaultValue = oldPost
    ? {
        body: oldPost.body,
      }
    : {
        body: faker.lorem.sentence(4),
      };

  return (
    <div>
      <form action={editId ? updatePost.bind(null, editId) : createPost}>
        <div className="space-y-6">
          {oldPost?.thumbnailURL && (
            <div className="aspect-video relative max-w-sm">
              <Image
                src={oldPost.thumbnailURL}
                className="object-cover"
                sizes="800pxx"
                alt=""
                fill
              />
            </div>
          )}

          <div className="w-80">
            <ImageCropper name="thumbnail" width={800} aspectRatio={16 / 9} />
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
        </div>
      </form>

      {editId && oldPost && (
        <form
          action={deletePost.bind(null, editId, oldPost.thumbnailURL)}
          className="border-t pt-4 mt-4 text-right"
        >
          <SubmitButton variant="destructive">記事を削除</SubmitButton>
        </form>
      )}
    </div>
  );
}
