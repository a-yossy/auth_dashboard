import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Header } from 'src/components/layouts/Header';

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <Head>
      <title>Auth Dashboard</title>
      <meta name='description' content='auth dashboard' />
    </Head>
    <Header />
    <main>{children}</main>
  </>
);
