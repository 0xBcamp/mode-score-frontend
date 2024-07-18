import '@/app/globals.css'; 
import '/tailwind.config.ts'
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
