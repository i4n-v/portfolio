import { Poppins, Fira_Sans, Fira_Code } from '@next/font/google';

const primaryFont = Poppins({
  variable: '--primary-font',
  weight: ['500', '600'],
  style: ['normal'],
  display: 'swap',
});

const secondaryFont = Fira_Sans({
  variable: '--secondary-font',
  weight: ['400', '500'],
  style: ['normal'],
  display: 'swap',
});

const tertiaryFont = Fira_Code({
  variable: '--tertiary-font',
  weight: ['400'],
  style: ['normal'],
  display: 'swap',
});

const fonts = [primaryFont.variable, secondaryFont.variable, tertiaryFont.variable].join(' ');

export default fonts;
