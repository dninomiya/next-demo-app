import PostForm from '@/app/components/post-form';
import React from 'react';

export default function Page({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  return <PostForm editId={id} />;
}
