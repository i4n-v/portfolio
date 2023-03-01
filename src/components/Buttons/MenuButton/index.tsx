import React from 'react';
import IMenuButtonProps from './types';
import styles from './styles.module.scss';

export default function MenuButton({ children, onClick }: IMenuButtonProps) {
  return (
    <button type="button" className={styles.menuButton} onClick={onClick}>
      {children}
    </button>
  );
}
