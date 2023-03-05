import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={inter.variable}>
        <Component {...pageProps} />
        <Analytics />
      </main>
    </>
  );
}

export default MyApp;
