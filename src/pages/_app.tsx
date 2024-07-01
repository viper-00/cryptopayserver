import '../styles/index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Providers from 'components/Common/Providers';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {}, []);

  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
};

export default MyApp;
