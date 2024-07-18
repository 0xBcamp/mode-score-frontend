import '@/app/globals.css'; 
import '/tailwind.config.ts'
import type { AppProps } from 'next/app';
import Web3ModalProvider from '@/context/context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <Web3ModalProvider><Component {...pageProps} /> </Web3ModalProvider>);
}

export default MyApp;