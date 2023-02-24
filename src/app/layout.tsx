import React from 'react';
import '@/../styles/global.scss';
import fonts from '@/config/fonts';
import { Header, Footer } from '@/components';

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
