import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';
import { MenuButton } from '../Buttons';

export default function Header() {
  const links = [
    { name: 'Contato', href: '#contact' },
    { name: 'Formação', href: '#formation' },
    { name: 'Experiências', href: '#experience' },
    { name: 'Projetos', href: '#projects' },
  ];

  return (
    <header className={styles.container}>
      <div>
        <Link href="/">
          <Image src="logo-dark.svg" alt="logo" width={67.22} height={24} />
        </Link>
        <nav>
          <ul className={styles.menu}>
            {links.map(({ name, href }) => (
              <li key={name}>
                <MenuButton href={href}>{name}</MenuButton>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
