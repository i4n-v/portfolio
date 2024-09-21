import { ComponentProps, ReactNode } from 'react';
import { Control, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { ITextFieldProps } from '../TextField/types';

interface IAutocompleteFieldProps<T> extends Omit<ITextFieldProps, 'type'> {
  control: Control<any, any>;
  multiple?: boolean;
  options: T[];
  optionLabelKey: string;
  optionValueKey?: string;
  optionCompareKey?: string;
  emptyMessage?: string;
}

interface ISelectedOptions {
  options: any[];
}

interface ISelectionIndicator {
  onClear(): void;
}

export type { IAutocompleteFieldProps, ISelectedOptions, ISelectionIndicator };
