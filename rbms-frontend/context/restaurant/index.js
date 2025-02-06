import React, { useEffect, useContext, useState, createContext } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { selectUserState } from '@/store/user/userSlice';
import { getRestaurantBySlug } from '@/services';
import { getError } from '@/helpers/snackbarHelpers';
import initialState from './initial-state';

const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const router = useRouter();
  const slug = router.query.id;

  const user = useSelector(selectUserState);
  const [details, setDetails] = useState(initialState);

  useEffect(() => {
    (async () => {
      try {
        if (!slug) return;

        const { data } = await getRestaurantBySlug(slug);

        // if (data.userId !== user.id) {
        //   throw new Error('User is not authorized');
        // }

        setDetails(data);
      } catch (e) {
        enqueueSnackbar({
          variant: 'error',
          message: getError(e),
          onEnter: () => router.push('/'),
        });
      }
    })();

    // eslint-disable-next-line
  }, [slug]);

  const detailsHandler = (updatedDetails) => {
    setDetails((prevState) => ({
      ...prevState,
      ...updatedDetails,
    }));
  };

  const contextValue = {
    details,
    detailsHandler,
  };

  return (
    <RestaurantContext.Provider value={contextValue}>
      {children}
    </RestaurantContext.Provider>
  );
};

const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  if (!context) throw new Error('useRestaurantContext requires RestaurantProvider');
  return context;
};

export { RestaurantProvider, useRestaurantContext };
