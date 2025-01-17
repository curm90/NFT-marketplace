import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThirdwebProvider } from 'thirdweb/react';
import Header from '../components/Header/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NFT Marketplace',
  description: 'NFT Marketplace',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThirdwebProvider>
          <Header />
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
