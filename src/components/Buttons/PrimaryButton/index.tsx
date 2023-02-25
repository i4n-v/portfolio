import React from 'react';
import Link from 'next/link';
import IPrimaryButtonProps from './types';
import styles from './styles.module.scss';

export default function PrimaryButton({ href, children, onClick, download }: IPrimaryButtonProps) {
  return (
    <Link href={href} className={styles.primaryButton} onClick={onClick} download={download}>
      {children}
    </Link>
  );
}
