import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import GithubMark from '@/components/GithubMark';
import { Button } from '@/components/ui/button';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Text Widgets',
  description: 'A take-home challenge for Trumpet, built by @joshjavier',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-svh flex-col antialiased`}
      >
        <header className="flex min-h-16 items-center justify-end px-6">
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="GitHub repo"
            className="cursor-pointer rounded-full"
            asChild
          >
            <a
              href="https://github.com/joshjavier/trumpet-challenge"
              target="_blank"
              rel="noreferrer noopener"
            >
              <GithubMark size={24} aria-hidden="true" />
            </a>
          </Button>
        </header>
        {children}
      </body>
    </html>
  );
}
