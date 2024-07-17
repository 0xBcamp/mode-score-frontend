import { Manrope } from 'next/font/google';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';

const fontHeading = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

const fontBody = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn('antialiased', fontHeading.variable, fontBody.variable, inter.className)}>
        {children}
      </body>
    </html>
  );
}