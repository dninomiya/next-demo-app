import { deletePost } from '@/app/actions/post';
import PostForm from '@/app/components/post-form';
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
      <form>
        <Button formAction={deletePost.bind(null, id)} variant="ghost">
          記事を削除
        </Button>
      </form>
    </div>
  );
}
