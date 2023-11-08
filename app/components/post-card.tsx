import { hasLike } from '@/app/actions/post';
import LikeButton from '@/app/components/like-button';
import RelativeTimestamp from '@/app/components/relative-timestamp';
import { auth } from '@clerk/nextjs';
import { Prisma } from '@prisma/client';
import { User } from 'lucide-react';
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
      <div className="flex items-center mb-2">
        <div className="w-12 h-12 rounded-full grid place-content-center overflow-hidden bg-gray-100 mr-2">
          {post.author.profileImageURL ? (
            <Image
              sizes="48px"
              src={post.author.profileImageURL}
              className="object-cover"
              fill
              alt=""
            />
          ) : (
            <User size={24} className="text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <p className="mb-2 leading-none font-semibold">{post.author.name}</p>
          <p className="text-muted-foreground leading-none text-sm">
            <RelativeTimestamp date={post.createdAt} />
          </p>
        </div>
      </div>

      <p className="truncate">{post.body}</p>

      {post.authorId !== userId && <LikeButton id={post.id} hasLike={liked} />}
    </div>
  );
}
