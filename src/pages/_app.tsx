import 'src/styles/globals.css';
import type { AppProps } from 'next/app';
import { AppProvider } from 'src/providers/app';
import { Layout } from 'src/components/layouts';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}
