import React from 'react';
import Link from 'next/link';
import ISecondaryButtonProps from './types';
import styles from './styles.module.scss';

export default function SecondaryButton({ href, children }: ISecondaryButtonProps) {
  return (
    <Link href={href} target="_blank" className={styles.secondaryButton}>
      {children}
    </Link>
  );
}
