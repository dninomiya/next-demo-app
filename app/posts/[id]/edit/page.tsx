import { deletePost } from '@/app/actions/post';
import PostForm from '@/app/components/post-form';
import SubmitButton from '@/app/components/submit-button';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function Page({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div>
      <PostForm editId={id} />
      <form action={deletePost.bind(null, id)} className="border-t pt-4 mt-4">
        <SubmitButton variant="destructive">記事を削除</SubmitButton>
      </form>
    </div>
  );
}
