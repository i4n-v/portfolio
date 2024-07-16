import React, { useMemo } from 'react';
import ITextFieldProps from './types';
import styles from './styles.module.scss';

export default function TextField({
  name,
  type,
  label,
  placeholder,
  register,
  registerOptions,
  leftIcon,
  rightIcon,
  ...props
}: ITextFieldProps) {
  return (
    <div className={styles.inputContainer}>
      <input
        id={name}
        placeholder={placeholder ?? ''}
        data-left-icon={!!leftIcon}
        data-right-icon={!!rightIcon}
        {...register(name, registerOptions)}
        {...props}
      />
      {label && (
        <label className={''} htmlFor={name}>
          {label}
          <span>{registerOptions?.required ? '*' : ''}</span>
        </label>
      )}
      {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}
      {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
    </div>
  );
}
