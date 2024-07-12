import React from 'react';
import '@/../styles/global.scss';
import fonts from '@/config/fonts';
import { Header, Footer } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ian Vinícius | Portifolio',
  description: 'Desenvolvedor Full Stack, Next, React, React Native, Node e TypeScript.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={fonts}>
      <head />
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
