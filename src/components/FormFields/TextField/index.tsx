import React from 'react';
import { ITextFieldProps } from './types';
import styles from './styles.module.scss';
import { useController } from 'react-hook-form';

export default function TextField({
  value,
  name,
  type,
  label,
  placeholder,
  control,
  leftIcon,
  rightIcon,
  required,
  onBlur,
  onChange,
  ...props
}: ITextFieldProps) {
  const registerSettings = control ? useController({ name, control }) : null;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      return onChange(event);
    }

    if (registerSettings) {
      registerSettings.field.onChange(event);
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (onBlur) {
      return onBlur(event);
    }

    if (registerSettings) {
      registerSettings.field.onBlur();
    }
  }

  return (
    <div className={styles.inputContainer}>
      {leftIcon}
      <input
        id={name}
        placeholder={placeholder ?? ''}
        value={value}
        {...registerSettings}
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {label && (
        <label className={''} htmlFor={name}>
          {label}
          <span>{required ? '*' : ''}</span>
        </label>
      )}
      {rightIcon}
    </div>
  );
}
