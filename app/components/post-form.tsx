'use client';

import {
  FormState,
  createPost,
  deletePost,
  updatePost,
} from '@/app/actions/post';
import ImageCropper from '@/app/components/image-cropper';
import SubmitButton from '@/app/components/submit-button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { faker } from '@faker-js/faker';
import { useFormState } from 'react-dom';

type Props =
  | {
      mode: 'edit';
      editId: string;
      defaultValue: {
        image?: string | null;
        body: string;
      };
    }
  | {
      mode: 'create';
    };

export default function PostForm(props: Props) {
  const { toast } = useToast();
  const [formState, formAction] = useFormState(
    async (_: FormState, formData: FormData) => {
      let action;
      if (props.mode === 'create') {
        action = createPost(formData);
      } else {
        action = updatePost(props.editId, formData);
      }

      return action.then((result) => {
        if (result.status === 'success') {
          toast({
            title: result.message,
          });
        } else if (result.status === 'error') {
          toast({
            title: '入力内容を確認してください',
            variant: 'destructive',
          });
        }

        return result;
      });
    },
    {
      status: 'idle',
    }
  );

  const defaultValue =
    props.mode === 'edit'
      ? props.defaultValue
      : {
          image: null,
          body: faker.lorem.paragraph(),
        };

  return (
    <div>
      <form action={formAction}>
        <div className="space-y-6">
          <div className="w-80">
            <ImageCropper
              defaultImage={defaultValue.image}
              name="thumbnail"
              width={800}
              aspectRatio={16 / 9}
            />
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="body">本文*</Label>
            <Textarea
              required
              name="body"
              placeholder=""
              defaultValue={defaultValue.body}
              id="body"
            />
            <p className="text-[0.8rem] text-muted-foreground">最大140文字</p>
            {formState.status === 'error' &&
              formState.fieldErrors.body?.map((error) => (
                <p key={error} className="text-red-500">
                  {error}
                </p>
              ))}
          </div>
          <div>
            <SubmitButton>
              {props.mode === 'edit' ? '更新' : '作成'}
            </SubmitButton>
          </div>
        </div>
      </form>

      {props.mode === 'edit' && (
        <form
          action={deletePost.bind(null, props.editId, defaultValue.image)}
          className="border-t pt-4 mt-4 text-right"
        >
          <SubmitButton variant="destructive">記事を削除</SubmitButton>
        </form>
      )}
    </div>
  );
}
