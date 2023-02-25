'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { scrollTo } from '@/utils';
import styles from './styles.module.scss';

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div>
        <Link href="#introduction" onClick={() => scrollTo('#introduction')}>
          <Image src="logo-light.svg" alt="logo" width={67.22} height={24} />
        </Link>
        <p>&copy; Ian Vínicius, alguns direitos reservados.</p>
      </div>
    </footer>
  );
}
