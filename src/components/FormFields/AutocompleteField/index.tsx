import React, { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';
import IAutocompleteFieldProps from './types';
import TextField from '../TextField';
import Image from 'next/image';
import { useController } from 'react-hook-form';
import { accessObjectByString } from '@/utils';

export default function AutocompleteField<T extends Record<string, any>>({
  name,
  control,
  multiple,
  options,
  optionLabelKey,
  optionValueKey,
  optionCompareKey,
  emptyMessage,
  ...props
}: IAutocompleteFieldProps<T>) {
  const { field } = useController({ name, control });
  const [focused, setFocused] = useState(false);
  const [textValue, setTextValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<T[]>(options);

  console.log(field.value);

  const optionIdentifier = useMemo(() => {
    return optionCompareKey || optionLabelKey;
  }, [optionCompareKey, optionLabelKey]);

  useEffect(() => {
    if (field.value instanceof Object && !multiple) {
      setTextValue(accessObjectByString(field.value, optionLabelKey));
    } else if (optionValueKey && !multiple) {
      const findedOption = filteredOptions.find(
        (item) => accessObjectByString(item, optionValueKey) === field.value
      );

      if (findedOption) setTextValue(accessObjectByString(findedOption, optionLabelKey));
    } else if (!field.value && textValue) {
      setTextValue('');
    }
  }, [field.value, optionLabelKey]);

  function filterOptionsByText({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
    const newValue = field.value && textValue !== value ? textValue : value;

    if (newValue) {
      const regex = new RegExp(newValue, 'i');
      const searchedOptions = options.filter((item) =>
        regex.test(accessObjectByString(item, optionLabelKey))
      );
      setFilteredOptions(searchedOptions);
    } else {
      setFilteredOptions(options);
    }

    setTextValue(newValue);

    if (field.value) field.onChange(null);
  }

  function handleChange(item: T) {
    if (!multiple) {
      field.onChange(item);
    } else {
      setTextValue('');

      let optionsValue = [item];

      if (Array.isArray(field.value)) {
        optionsValue = [...field.value, item];

        const optionToRemove = field.value.findIndex((option) => {
          if (optionValueKey) {
            return item === option;
          }

          return (
            accessObjectByString(option, optionIdentifier) ===
            accessObjectByString(item, optionIdentifier)
          );
        });

        if (optionToRemove !== -1) {
          optionsValue = field.value.filter((option) => {
            if (optionValueKey) {
              return item !== option;
            }

            return (
              accessObjectByString(option, optionIdentifier) !==
              accessObjectByString(item, optionIdentifier)
            );
          });
        }
      }

      field.onChange(optionsValue);
    }
  }

  function verifySelectedOptions(item: T) {
    if (multiple) {
      return field.value?.some((option: any) => {
        if (optionValueKey) {
          return accessObjectByString(item, optionValueKey) === option;
        }

        return (
          accessObjectByString(option, optionIdentifier) ===
          accessObjectByString(item, optionIdentifier)
        );
      });
    }

    if (optionValueKey) {
      return accessObjectByString(item, optionValueKey) === field.value;
    }

    if (field.value) {
      return (
        accessObjectByString(field.value, optionIdentifier) ===
        accessObjectByString(item, optionIdentifier)
      );
    }

    return false;
  }

  function toggleFocus() {
    setFocused((focused) => !focused);
  }

  return (
    <div className={styles.inputContainer}>
      <TextField
        name={name}
        value={textValue}
        rightIcon={
          <Image
            src={focused ? '/icons/arrow-down.svg' : '/icons/arrow-up.svg'}
            alt="arrow"
            width={32}
            height={32}
          />
        }
        onChange={filterOptionsByText}
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        {...props}
      />
      {focused && (
        <ul>
          {filteredOptions.map((option, index) => (
            <li
              key={
                optionCompareKey
                  ? accessObjectByString(option, optionCompareKey)
                  : `autocomplete-option-${index}`
              }
              data-selected={verifySelectedOptions(option)}
              onClick={() => handleChange(option)}
            >
              {accessObjectByString(option, optionLabelKey)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
