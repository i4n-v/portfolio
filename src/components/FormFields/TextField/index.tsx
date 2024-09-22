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
  const inputRef = React.useRef<HTMLInputElement>(null);
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

  function handleFocus(event: React.MouseEvent<HTMLInputElement>) {
    if (inputRef.current && !(event.target instanceof HTMLImageElement)) {
      inputRef.current.focus();
    }
  }

  return (
    <div className={styles.inputContainer} onClick={handleFocus}>
      <div>
        {leftIcon}
        <input
          ref={inputRef}
          id={name}
          placeholder={placeholder ?? ''}
          value={value}
          {...registerSettings?.field}
          {...props}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {label && (
          <label htmlFor={name}>
            {label}
            <span>{required ? '*' : ''}</span>
          </label>
        )}
      </div>
      {rightIcon}
    </div>
  );
}
