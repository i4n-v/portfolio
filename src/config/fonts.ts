import { Poppins, Fira_Sans, Fira_Code } from '@next/font/google';

const primaryFont = Poppins({
  variable: '--primary-font',
  weight: ['500', '600'],
  style: ['normal'],
  display: 'swap',
  subsets: ['latin'],
});

const secondaryFont = Fira_Sans({
  variable: '--secondary-font',
  weight: ['400', '500', '600'],
  style: ['normal'],
  display: 'swap',
  subsets: ['latin'],
});

const tertiaryFont = Fira_Code({
  variable: '--tertiary-font',
  weight: ['400', '600'],
  style: ['normal'],
  display: 'swap',
  subsets: ['latin'],
});

const fonts = [primaryFont.variable, secondaryFont.variable, tertiaryFont.variable].join(' ');

export default fonts;
