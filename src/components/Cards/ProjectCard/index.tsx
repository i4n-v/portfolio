import React from 'react';
import { Tag } from '@/components/';
import { SecondaryButton } from '@/components/Buttons';
import Image from 'next/image';
import IProjectCardProps from './types';
import styles from './styles.module.scss';

export default function ProjectCard({
  title,
  description,
  tags,
  imageSrc,
  url,
  githubUrl,
}: IProjectCardProps) {
  return (
    <div className={styles.projectCard}>
      <div className={styles.imageContainer}>
        <h4>{title}</h4>
        <div />
        <Image src={imageSrc} alt={title} width={360} height={180} />
      </div>
      <p>{description}</p>
      <div>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div>
        <SecondaryButton href={url}>live demo</SecondaryButton>
        <SecondaryButton href={githubUrl}>github</SecondaryButton>
      </div>
    </div>
  );
}
