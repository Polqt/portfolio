import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
  title: {
    default: 'Janpol Hidalgo — Developer',
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
    title: 'Janpol Hidalgo — Developer',
    description:
      'Software engineer crafting modern web and mobile experiences.',
    siteName: 'Janpol Hidalgo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Janpol Hidalgo — Developer',
    description:
      'Software engineer crafting modern web and mobile experiences.',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcfcfc' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans noise-bg`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
