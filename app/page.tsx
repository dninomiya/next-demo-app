import { Button } from '@/components/ui/button';
import { SignUpButton, auth } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';
import heroImage from './hero.svg';
import { redirect } from 'next/navigation';

export default function About() {
  const { userId } = auth();

  if (userId) {
    redirect('/main');
  }

  return (
    <main className="min-h-screen grid place-content-center text-center">
      <div>
        <h1 className="font-bold text-3xl mb-6">ようこそ</h1>
        <p className="mb-6">アカウントを作成してください。</p>

        <Image className="h-60 mx-auto" src={heroImage} alt="" />

        <ol className="border list-decimal text-left pl-12 bg-muted text-muted-foreground p-4 rounded-lg mb-6 leading-loose">
          <li>
            <code className="px-2 py-1 border rounded-md bg-white">
              ***+clerk_test@example.com
            </code>
            でデモアカウントを作成できます。
          </li>
          <li>
            <code className="px-2 py-1 border rounded-md bg-white">424242</code>{' '}
            の認証コードでログインできます。
          </li>
        </ol>

        <SignUpButton afterSignUpUrl="/">
          <Button>アカウントを作成</Button>
        </SignUpButton>
      </div>
    </main>
  );
}
