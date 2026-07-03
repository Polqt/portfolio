import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import TakeoffIntro from '@/components/TakeoffIntro';
import TabTitleGimmick from '@/components/TabTitleGimmick';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Janpol Hidalgo - Developer',
    template: '%s | Janpol Hidalgo',
  },
  description:
    'Software engineer crafting modern web and mobile experiences. Exploring AI, real-time systems, and the art of building things that matter.',
  icons: {
    icon: '/WebAvatar.png',
    shortcut: '/WebAvatar.png',
    apple: '/WebAvatar.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Janpol Hidalgo - Developer',
    description:
      'Software engineer crafting modern web and mobile experiences.',
    siteName: 'Janpol Hidalgo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Janpol Hidalgo - Developer',
    description:
      'Software engineer crafting modern web and mobile experiences.',
  },
};

export const viewport: Viewport = {
  themeColor: '#141311',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans noise-bg`}
      >
        <TakeoffIntro />
        <TabTitleGimmick />
        {children}
      </body>
    </html>
  );
}
