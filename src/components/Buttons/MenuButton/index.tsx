import Link from 'next/link';
import React from 'react';
import IMenuButtonProps from './types';
import styles from './styles.module.scss';

export default function MenuButton({ href, children, onClick }: IMenuButtonProps) {
  return (
    <Link href={href} className={styles.menuButton} onClick={onClick}>
      {children}
    </Link>
  );
}
