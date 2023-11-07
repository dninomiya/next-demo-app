import { SignInButton, SignUpButton } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';

export default function Page() {
  return (
    <div>
      <Image
        src="/monsters/monster-1.svg"
        width={240}
        height={240}
        alt=""
        className="mx-auto mb-6"
      />
      <h1 className="font-black text-white text-8xl drop-shadow">DEVPETS</h1>

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

      <div className="flex gap-6 justify-center mt-10">
        <SignInButton>
          <button className="font-bold tracking-widest flex-1 px-4 py-3 rounded-full text-white border-2 border-white">
            ログイン
          </button>
        </SignInButton>

        <SignUpButton>
          <button className="font-bold tracking-widest flex-1 px-4 py-3 rounded-full bg-white shadow-lg">
            新規登録
          </button>
        </SignUpButton>
      </div>
    </div>
  );
}
