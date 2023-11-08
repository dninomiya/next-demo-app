import UserMenu from '@/app/components/user-menu';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex gap-2 items-center h-14 border-b px-6">
      <Link href="/" className="font-black text-xl">
        DEMO
      </Link>
      <span className="flex-1"></span>
      <SignedIn>
        <Button size="sm" asChild>
          <Link href="/create">記事作成</Link>
        </Button>
        <UserMenu />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button variant="outline">ログイン</Button>
        </SignInButton>
        <SignUpButton>
          <Button>会員登録</Button>
        </SignUpButton>
      </SignedOut>
    </header>
  );
}
