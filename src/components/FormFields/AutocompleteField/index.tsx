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
  emptyMessage = 'Nenhum item encontrado',
  ...props
}: IAutocompleteFieldProps<T>) {
  const { field } = useController({ name, control });
  const [open, setOpen] = useState(false);
  const [textValue, setTextValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<T[]>(options);

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

  function toggleOpen() {
    if (open) {
      return setTimeout(() => setOpen(false), 100);
    }

    setOpen(true);
  }

  const SelectedOptions = () => {
    return (
      <ul className={styles.selectedOptions}>
        {field.value.map((item: any, index: number) => {
          let selectedOption = item;

          if (optionValueKey) {
            selectedOption = options.find((option) => {
              return accessObjectByString(option, optionValueKey) === item;
            });
          }

          return (
            <li
              key={
                optionCompareKey
                  ? accessObjectByString(selectedOption, optionCompareKey)
                  : `autocomplete-selected-option-${index}`
              }
            >
              <span>{accessObjectByString(selectedOption, optionLabelKey)}</span>
              <Image
                src="/icons/close.svg"
                alt="remover"
                width={14}
                height={14}
                onClick={() => handleChange(item)}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={styles.inputContainer} data-has-selected-options={!!field.value?.length}>
      <TextField
        name={name}
        value={textValue}
        rightIcon={
          <Image
            src={open ? '/icons/arrow-down.svg' : '/icons/arrow-up.svg'}
            alt="arrow"
            width={32}
            height={32}
          />
        }
        leftIcon={multiple && <SelectedOptions />}
        onChange={filterOptionsByText}
        onFocus={toggleOpen}
        onBlur={toggleOpen}
        {...props}
      />
      {open && (
        <ul data-has-options={!!filteredOptions.length}>
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
          {!filteredOptions.length && <li>{emptyMessage}</li>}
        </ul>
      )}
    </div>
  );
}
