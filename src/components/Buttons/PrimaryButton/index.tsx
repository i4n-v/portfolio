import React from 'react';
import Link from 'next/link';
import IPrimaryButtonProps from './types';
import styles from './styles.module.scss';

export default function PrimaryButton({ href, children, onClick, download }: IPrimaryButtonProps) {
  return download ? (
    <a href={href} className={styles.primaryButton} download onClick={onClick}>
      {children}
    </a>
  ) : (
    <Link href={href} className={styles.primaryButton} onClick={onClick}>
      {children}
    </Link>
  );
}
