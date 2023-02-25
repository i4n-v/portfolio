import React from 'react';
import { Tag } from '@/components/';
import ICourseCardProps from './types';
import styles from './styles.module.scss';

export default function CourseCard({ title, workload }: ICourseCardProps) {
  return (
    <div className={styles.courseCard}>
      <p>{title}</p>
      <Tag>{workload}h</Tag>
    </div>
  );
}
