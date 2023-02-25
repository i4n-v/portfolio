import React from 'react';
import ITagProps from './types';
import styles from './styles.module.scss';

export default function Tag({ children }: ITagProps) {
  return <span className={styles.tag}>{children}</span>;
}
