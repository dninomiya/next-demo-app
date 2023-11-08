import { hasLike } from '@/app/actions/post';
import LikeButton from '@/app/components/like-button';
import { auth } from '@clerk/nextjs';
import { Post, Prisma } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

type PostWithOwner = Prisma.PostGetPayload<{
  include: { author: true };
}>;

export default async function PostCard({ post }: { post: PostWithOwner }) {
  const { userId } = auth();
  const liked = await hasLike(post.id);

  return (
    <div className="py-4">
      {post.thumbnailURL && (
        <div className="aspect-video relative w-full overflow-hidden rounded-lg mb-4">
          <Image
            sizes="800px"
            src={post.thumbnailURL}
            className="object-cover"
            fill
            alt=""
          />
        </div>
      )}
      <h2 className="font-bold mb-1">
        <Link href={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <p>{post.author.name}</p>
      <p className="text-muted-foreground">
        <time>{format(post.createdAt, 'yyyy年M月d日 HH:mm:ss')}</time>
      </p>

      <p className="truncate">{post.body}</p>

      {post.authorId !== userId && <LikeButton id={post.id} hasLike={liked} />}
    </div>
  );
}
