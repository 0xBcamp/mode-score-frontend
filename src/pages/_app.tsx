// pages/_app.tsx
import '@/app/globals.css';
import type { AppProps } from 'next/app';
import Web3ModalProvider from '@/context/context';
// import { ThemeProvider } from '@/context/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ThemeProvider>
      <Web3ModalProvider>
        <Component {...pageProps} />
      </Web3ModalProvider>
    // </ThemeProvider>
  );
}

export default MyApp;
