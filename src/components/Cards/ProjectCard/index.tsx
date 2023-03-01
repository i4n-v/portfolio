import React from 'react';
import { Tag } from '@/components/';
import { SecondaryButton } from '@/components/Buttons';
import IProjectCardProps from './types';
import styles from './styles.module.scss';

export default function ProjectCard({ title, description, tags, link }: IProjectCardProps) {
  return (
    <div className={styles.projectCard}>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
      <p>{description}</p>
      <div>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <SecondaryButton href={link}>demo</SecondaryButton>
    </div>
  );
}
