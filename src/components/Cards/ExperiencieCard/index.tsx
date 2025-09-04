'use client';

import React from 'react';
import Tag from '@/components/tag';
import styles from './styles.module.scss';
import IExperiencieCardProps from './types';

function CodeCard({ title, subtitle, period, description, tags }: IExperiencieCardProps) {
  return (
    <div className={styles.experiencieCard}>
      <h2 className={styles.title}>{title}</h2>
      <Tag>{period}</Tag>
      <p className={styles.subtitle}>{subtitle}</p>
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
