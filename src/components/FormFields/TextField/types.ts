import { ComponentProps, ReactNode } from 'react';
import { RegisterOptions, UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';

type ITextFieldPropsToOmit = 'id' | keyof RegisterOptions<any> | keyof UseFormRegisterReturn<any>;

interface ITextFieldProps extends Omit<ComponentProps<'input'>, ITextFieldPropsToOmit> {
  name: string;
  label?: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions<any>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default ITextFieldProps;
