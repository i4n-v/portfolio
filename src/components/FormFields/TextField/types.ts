import { ComponentProps, ReactNode } from 'react';
import { Control } from 'react-hook-form';

type ITextFieldPropsToOmit = 'id';

interface ITextFieldProps extends Omit<ComponentProps<'input'>, ITextFieldPropsToOmit> {
  name: string;
  label?: string;
  control?: Control<any, any>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export type { ITextFieldProps, ITextFieldPropsToOmit };
