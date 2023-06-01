import { Noto_Sans, Rajdhani } from 'next/font/google';

export const SECOND = 1000;

export const rajdhani = Rajdhani({
  weight: '600',
  subsets: ['latin'],
  variable: '--rajdhani',
  display: 'swap',
});

export const notoSans = Noto_Sans({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--noto-sans',
  display: 'swap',
});
