import { deletePost, getPost } from '@/app/actions/post';
import PostForm from '@/app/components/post-form';
import SubmitButton from '@/app/components/submit-button';
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
    <div>
      <PostForm editId={id} />
      <form
        action={deletePost.bind(null, id, post.thumbnailURL)}
        className="border-t pt-4 mt-4"
      >
        <SubmitButton variant="destructive">記事を削除</SubmitButton>
      </form>
    </div>
  );
}
