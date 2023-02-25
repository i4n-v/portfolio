import { MouseEventHandler, ReactNode } from 'react';

type IPrimaryButtonProps = {
  href: string;
  children: ReactNode;
  download?: boolean;
  onClick?: MouseEventHandler;
};

export default IPrimaryButtonProps;
