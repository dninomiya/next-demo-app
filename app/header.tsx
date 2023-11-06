import { UserButton } from '@clerk/nextjs';
import React from 'react';

export default function Header() {
  return (
    <header className="flex items-center container h-16 border-b">
      <span className="font-bold text-xlx">DEMO</span>
      <div className="flex-1"></div>
      <UserButton />
    </header>
  );
}
