import React from 'react';
import { Tag } from '@/components/';
import IFormationCardProps from './types';
import styles from './styles.module.scss';

export default function FormationCard({ title, subtitle, tags }: IFormationCardProps) {
  return (
    <div className={styles.formationCard}>
      <p>{title}</p>
      <span>{subtitle}</span>
      <div>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  );
}
