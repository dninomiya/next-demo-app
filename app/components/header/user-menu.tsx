import { currentUser } from '@/app/actions/user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SignOutButton } from '@clerk/nextjs';
import { LogOut, Settings, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function UserMenu() {
  const user = await currentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full bg-gray-50 overflow-hidden border relative">
          {user?.profileImageURL ? (
            <Image width={40} height={40} src={user?.profileImageURL} alt="" />
          ) : (
            <div className="w-10 h-10" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/mypage">
            <User className="mr-2" size={20} />
            マイページ
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="https://driving-raven-64.accounts.dev/user">
            <Settings className="mr-2" size={20} />
            アカウント設定
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <SignOutButton>
          <DropdownMenuItem>
            <LogOut className="mr-2" size={20} />
            ログアウト
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
