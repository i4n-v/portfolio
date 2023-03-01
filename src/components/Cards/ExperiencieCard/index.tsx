'use client';

import React from 'react';
import Tag from '@/components/tag';
import styles from './styles.module.scss';
import IExperiencieCardProps from './types';

function CodeCard({ title, period, description, tags }: IExperiencieCardProps) {
  return (
    <div className={styles.experiencieCard}>
      <p className={styles.title}>{title}</p>
      <Tag>{period}</Tag>
      <p>{description}</p>
      <div>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  );
}

export default CodeCard;
