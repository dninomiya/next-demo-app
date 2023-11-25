import { AppConfig } from '@/app.config';
import Browser from '@/app/components/browser';
import Footer from '@/app/components/footer';
import GithubLink from '@/app/components/github-link';
import Header from '@/app/components/header';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: AppConfig.title,
  description: AppConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignInUrl="/" afterSignUpUrl="/onboarding">
      <html lang="ja">
        <body className="px-4 py-10 bg-gray-50 bg-[url('/grid.svg')]">
          <Browser>
            <Header />
            <main className="p-6">{children}</main>
          </Browser>
          <Footer />
          <Analytics />
          <GithubLink href={AppConfig.githubURL} />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
