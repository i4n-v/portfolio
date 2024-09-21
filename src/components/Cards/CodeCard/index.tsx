'use client';

import React from 'react';
import { getAgeByDate } from '@/utils';
import styles from './styles.module.scss';
import ICodeCardProps from './types';

function CodeCard({ className = '' }: ICodeCardProps) {
  return (
    <div className={`${styles.codeContainer} ${className}`}>
      <pre>
        <span className={styles.order}>1</span> class Person &#123;
      </pre>
      <pre>
        <span className={styles.order}>2</span> constructor() &#123;
      </pre>
      <pre>
        <span className={styles.order}>3</span> this.name ={' '}
        <span className={styles.attribute}>&#34;Ian Vinícius&#34;</span>;
      </pre>
      <pre>
        <span className={styles.order}>4</span> this.stacks = &#91;
      </pre>
      <pre>
        <span className={styles.order}>5</span>{' '}
        <span className={styles.attribute}>&#34;UI/UX&#34;</span>,
      </pre>
      <pre>
        <span className={styles.order}>6</span>{' '}
        <span className={styles.attribute}>&#34;Front End&#34;</span>,
      </pre>
      <pre>
        <span className={styles.order}>7</span>{' '}
        <span className={styles.attribute}>&#34;Back End&#34;</span>
      </pre>
      <pre>
        <span className={styles.order}>8</span> &#93;;
      </pre>
      <pre>
        <span className={styles.order}>9</span> this.age ={' '}
        <span className={styles.attribute}>{getAgeByDate('2002/06/02')}</span>;
      </pre>
      <pre>
        <span className={styles.order}>10</span> &#125;
      </pre>
      <pre>
        <span className={styles.order}>11</span> &#125;
      </pre>
    </div>
  );
}

export default CodeCard;
