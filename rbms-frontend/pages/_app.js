import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Elements } from '@stripe/react-stripe-js';

// Store
import { Provider } from 'react-redux';
import { persistor, store } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';

// Styles
import { ThemeContextProvider } from '@/context/theme-provider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '@/styles/globals.css';

// Layout
import Layout from '@/components/layout/layout';

// Utils
import { options, stripePromise } from '@/utils/stripe';

// Services
import { connectToMeilisearch } from '@/services/meilisearch';
import { getApprovedRestaurants } from '@/services';

const meili = connectToMeilisearch();

const AppComponent = ({ Component, pageProps, ...rest }) => {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => page);

  const fetchRestaurants = async () => {
    try {
      const { data } = await getApprovedRestaurants();
      const { restaurants } = data;

      const modifiedRestaurants = restaurants.map((restaurant) => ({
        ...restaurant,
        categories: restaurant.categories[0].split(', '),
        _geo: {
          lat: restaurant.location.coordinates[1],
          lng: restaurant.location.coordinates[0],
        },
      }));

      meili
        .index('restaurants')
        .addDocuments(modifiedRestaurants, { primaryKey: 'id' })
        .catch((error) => console.error('MeiliSearch Error:', error));

      meili
        .index('restaurants')
        .updateFilterableAttributes(['categories', '_geo'])
        .catch((error) => console.error('MeiliSearch Error:', error));

      meili
        .index('restaurants')
        .updateSortableAttributes(['featuredTill', 'rating', 'count'])
        .catch((error) => console.error('MeiliSearch Error:', error));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<h1>Loading</h1>} persistor={persistor}>
        <Elements stripe={stripePromise} options={options}>
          <ThemeContextProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Layout>
                {getLayout(<Component {...pageProps} key={router.asPath} />)}
              </Layout>
            </LocalizationProvider>
          </ThemeContextProvider>
        </Elements>
      </PersistGate>
    </Provider>
  );
};

export default AppComponent;

export const getStaticProps = async () => {
  const { data } = await getApprovedRestaurants();
  const { restaurants } = data;

  const modifiedRestaurants = restaurants.map((restaurant) => ({
    ...restaurant,
    categories: restaurant.categories[0].split(', '),
    _geo: {
      lat: restaurant.location.coordinates[1],
      lng: restaurant.location.coordinates[0],
    },
  }));

  meili
    .index('restaurants')
    .addDocuments(modifiedRestaurants, { primaryKey: 'id' })
    .catch((error) => console.error('MeiliSearch Error:', error));

  meili
    .index('restaurants')
    .updateFilterableAttributes(['categories', '_geo'])
    .catch((error) => console.error('MeiliSearch Error:', error));

  meili
    .index('restaurants')
    .updateSortableAttributes(['rating', 'count'])
    .catch((error) => console.error('MeiliSearch Error:', error));

  return {
    props: { restaurants: modifiedRestaurants },
    revalidate: 300,
  };
};
