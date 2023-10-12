// import 'src/styles/globals.css';
import type { AppProps } from 'next/app';
import { AppProvider } from 'src/providers/app';
import { Layout } from 'src/components/layouts';

const App = ({ Component, pageProps }: AppProps) => (
  <AppProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </AppProvider>
);

export default App;
