import React, { useEffect, useState } from 'react';
import { selectUserState } from '@/store/user/userSlice';

// Services
import { getRestaurantRecommendations } from '@/services';
import { connectToMeilisearch } from '@/services/meilisearch';
import { useSelector } from 'react-redux';

// Component
import SearchRestaurant from '@/components/search-restaurant/search-restaurant';

const meili = connectToMeilisearch();

const SearchPage = () => {
  const [recommendationsExist, setRecommendationsExist] = useState(false);

  const user = useSelector(selectUserState);
  const { coordinates } = user.location;
  const longitude = (coordinates && coordinates[0]) || -82.7333444;
  const latitude = (coordinates && coordinates[1]) || 28.2172884;

  const fetchRecommendedRestaurants = async () => {
    try {
      const { data } = await getRestaurantRecommendations({
        coordinates: [longitude, latitude],
      });
      if (data.length > 0) {
        setRecommendationsExist(true);

        const recommendedRestaurants = data.map((restaurant) => ({
          ...restaurant,
          categories: restaurant.categories[0].split(', '),
          location: {
            coordinates: [
              restaurant['location.coordinates'][0],
              restaurant['location.coordinates'][1],
            ],
            country: restaurant['location.country'],
            type: restaurant['location.type'],
          },
          _geo: {
            lat: restaurant['location.coordinates'][1],
            lng: restaurant['location.coordinates'][0],
          },
        }));

        meili
          .deleteIndex('recommendations')
          .catch((error) => console.error('MeiliSearch Error:', error));

        meili
          .index('recommendations')
          .addDocuments(recommendedRestaurants, { primaryKey: '_id' })
          .catch((error) => console.error('MeiliSearch Error:', error));

        meili
          .index('recommendations')
          .updateFilterableAttributes(['categories', '_geo'])
          .catch((error) => console.error('MeiliSearch Error:', error));

        meili
          .index('recommendations')
          .updateSortableAttributes(['featuredTill', 'rating', 'count'])
          .catch((error) => console.error('MeiliSearch Error:', error));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user) fetchRecommendedRestaurants();
  }, [user]);

  return (
    <SearchRestaurant
      recommendationsExist={recommendationsExist}
      setRecommendationsExist={setRecommendationsExist}
    />
  );
};

export default SearchPage;
