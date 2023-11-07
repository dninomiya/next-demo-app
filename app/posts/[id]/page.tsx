import { getPost } from '@/app/actions/post';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import React from 'react';

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
    <article>
      <h1>{post.title}</h1>
      <p>
        <time>{format(post.createdAt, 'yyyy/MM/dd HH:mm:ss')}</time>
      </p>
      <p className="whitespace-pre-line">{post.body}</p>
    </article>
  );
}
