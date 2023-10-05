import 'src/styles/globals.css';
import type { AppProps } from 'next/app';
import { AppProvider } from 'src/providers/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
