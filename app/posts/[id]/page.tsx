import { deletePost, getPost } from '@/app/actions/post';
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs';
import { format } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const post = await getPost(id);
  const { userId } = auth();

  if (!post) {
    notFound();
  }

  return (
    <article>
      <p className="text-muted-foreground mb-4">
        <time>{format(post.createdAt, 'yyyy年M月d日 HH:mm:ss')}</time>
      </p>
      <p className="whitespace-pre-line">{post.body}</p>

      <div className="border-t pt-4 mt-6">
        {userId === post.authorId && (
          <Button
            formAction={deletePost.bind(null, id)}
            variant="ghost"
            asChild
          >
            <Link href={`/posts/${id}/edit`}>編集</Link>
          </Button>
        )}
      </div>
    </article>
  );
}
