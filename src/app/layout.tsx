// Import necessary modules and styles
import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config/config'
import Web3ModalProvider from '@/context/context'
import { Manrope, Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

// Define font styles
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

export const metadata: Metadata = {
  title: 'Mode Score',
  description: 'Mode Score BCamp'
}

// Define the combined layout component
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body className={cn('antialiased', fontHeading.variable, fontBody.variable, inter.className)}>
        <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
      </body>
    </html>
  );
}
