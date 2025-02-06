import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

// Store
import { Provider } from 'react-redux';
import { persistor, store } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';

// Styles
import { ThemeContextProvider } from '@/context/theme-provider';

import '@/styles/globals.css';

// Layout
import Layout from '@/components/layout/layout';

const AppComponent = ({ Component, pageProps, ...rest }) => {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <PersistGate loading={<h1>Loading</h1>} persistor={persistor}>
        <ThemeContextProvider>
          <Layout>{getLayout(<Component {...pageProps} key={router.asPath} />)}</Layout>
        </ThemeContextProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppComponent;
