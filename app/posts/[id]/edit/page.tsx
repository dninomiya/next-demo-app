import { getPost } from '@/app/actions/post';
import PostForm from '@/app/components/post-form';
import { notFound } from 'next/navigation';

export default async function Page({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <PostForm
      editId={id}
      mode="edit"
      defaultValue={{
        body: post.body,
        image: post.thumbnailURL,
      }}
    />
  );
}
