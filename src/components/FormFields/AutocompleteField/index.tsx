import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useController } from 'react-hook-form';
import { accessObjectByString } from '@/utils';
import styles from './styles.module.scss';
import { IAutocompleteFieldProps, ISelectedOptions, ISelectionIndicator } from './types';
import TextField from '../TextField';

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

  const optionIdentifier = useMemo(
    () => optionCompareKey || optionLabelKey,
    [optionCompareKey, optionLabelKey]
  );

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
    if (value) {
      const regex = new RegExp(value, 'i');
      const searchedOptions = options.filter((item) =>
        regex.test(accessObjectByString(item, optionLabelKey))
      );
      setFilteredOptions(searchedOptions);
    } else {
      setFilteredOptions(options);
    }

    setTextValue(value);

    if (field.value && !multiple) field.onChange(null);
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

  function clearInput() {
    field.onChange(null);
    setTextValue('');
  }

  function toggleOpen() {
    if (open) {
      return setTimeout(() => setOpen(false), 100);
    }

    setOpen(true);
  }

  function SelectedOptions({ options }: ISelectedOptions) {
    if (!Array.isArray(options)) return null;

    return (
      <>
        {options.map((item: any, index: number) => {
          let selectedOption = item;

          if (optionValueKey) {
            selectedOption = options.find(
              (option) => accessObjectByString(option, optionValueKey) === item
            );
          }

          return (
            <div
              className={styles.selectedOptions}
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
                className={styles.iconSelection}
                width={14}
                height={14}
                onClick={() => handleChange(item)}
              />
            </div>
          );
        })}
      </>
    );
  }

  function SelectionIndicator({ onClear }: ISelectionIndicator) {
    return (
      <div className={styles.selectionIndicator}>
        <Image
          src="/icons/close.svg"
          alt="remover"
          className={styles.iconSelection}
          width={18}
          height={18}
          onClick={onClear}
        />
        <Image
          src={open ? '/icons/arrow-down.svg' : '/icons/arrow-up.svg'}
          alt="arrow"
          width={32}
          height={32}
        />
      </div>
    );
  }

  return (
    <div
      className={styles.inputContainer}
      data-has-selected-options={(!multiple && !!field.value) || !!field.value?.length}
    >
      <TextField
        name={name}
        value={textValue}
        rightIcon={<SelectionIndicator onClear={clearInput} />}
        leftIcon={<SelectedOptions options={field.value} />}
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
