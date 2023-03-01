'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { scrollTo } from '@/utils';
import styles from './styles.module.scss';
import { MenuButton } from '../Buttons';

export default function Header() {
  const links = [
    { name: 'Contato', id: '#contact' },
    { name: 'Formação', id: '#formation' },
    { name: 'Experiências', id: '#experiencies' },
    { name: 'Projetos', id: '#projects' },
  ];

  return (
    <header className={styles.container}>
      <div>
        <Link href="#introduction" onClick={() => scrollTo('#introduction')}>
          <Image src="logo-dark.svg" alt="logo" width={67.22} height={24} />
        </Link>
        <nav>
          <ul className={styles.menu}>
            {links.map(({ name, id }) => (
              <li key={name}>
                <MenuButton onClick={() => scrollTo(id)}>{name}</MenuButton>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
