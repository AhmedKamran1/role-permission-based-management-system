import React, { useEffect, useRef, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useSelector } from 'react-redux';
import { selectUserState } from '@/store/user/userSlice';

// Styles
import { Grid } from '@mui/material';

// Services
import { connectToMeilisearch } from '@/services/meilisearch';

// Components
import ListedRestaurants from './listed-restaurants/listed-restaurants';
import Map from './map/map';

// Utils
import { SortBy } from '@/utils/constants';

const client = connectToMeilisearch();

const SearchRestaurant = ({ recommendationsExist, setRecommendationsExist }) => {
  const user = useSelector(selectUserState);
  const { coordinates } = user.location;
  const longitude = (coordinates && coordinates[0]) || -82.7333444;
  const latitude = (coordinates && coordinates[1]) || 28.2172884;

  const [filterText, setFilterText] = useState('');
  const debouncedSearch = useDebounce(filterText, 500);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedSortType, setSelectedSortType] = useState(SortBy.RECOMMENDED.sortType);

  const [location, setLocation] = useState({
    lng: longitude,
    lat: latitude,
    distanceInMeters: 25000,
  });
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [hoverId, setHoverId] = useState(null);
  const searchLimit = useRef(10);

  const categoryResetHandler = () => {
    setSelectedCategories([]);
  };

  const sortTypeHandler = (type) => {
    if (type === SortBy.RECOMMENDED.sortType) setRecommendationsExist(true);
    else setRecommendationsExist(false);
    setSelectedSortType(type);
  };

  useEffect(() => {
    const categories = selectedCategories.map((category) => `categories = "${category}"`);
    setFilteredCategories(categories);
  }, [selectedCategories]);

  const pageHandler = (event, newPage) => {
    setPage(newPage);
  };

  const hoverIdHandler = (value) => {
    if (value === hoverId) return;
    // setHoverId(value);
  };

  const resetHoverIdHandler = () => {
    setHoverId(null);
  };

  const categorySelectionHandler = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((prevCategory) => prevCategory !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  useEffect(() => {
    if (!recommendationsExist) setSelectedSortType(SortBy.RATING.sortType);
    else setSelectedSortType(SortBy.RECOMMENDED.sortType);
  }, [recommendationsExist]);

  useEffect(() => {
    const options = {
      filter: [
        filteredCategories,
        `_geoRadius(${location.lat}, ${location.lng}, ${location.distanceInMeters})`,
      ],
      hitsPerPage: searchLimit.current,
      page: page,
    };

    if (selectedSortType && selectedSortType !== SortBy.RECOMMENDED.sortType) {
      options.sort = [`featuredTill:asc`, `${selectedSortType}:desc`];
    }

    client
      .index(recommendationsExist ? 'recommendations' : 'restaurants')
      .search(debouncedSearch, options)
      .then((res) => {
        setFilteredRestaurants(res.hits);
        setTotalPage(res.totalPages);
      })
      .catch((error) => console.error('MeiliSearch Error:', error));
  }, [
    debouncedSearch,
    filteredCategories,
    selectedSortType,
    page,
    location,
    recommendationsExist,
  ]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedSortType]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={7}>
        <ListedRestaurants
          hoverIdHandler={hoverIdHandler}
          resetHoverIdHandler={resetHoverIdHandler}
          categoryResetHandler={categoryResetHandler}
          categorySelectionHandler={categorySelectionHandler}
          selectedCategories={selectedCategories}
          setFilterText={setFilterText}
          filterText={filterText}
          filteredRestaurants={filteredRestaurants}
          selectedSortType={selectedSortType}
          sortTypeHandler={sortTypeHandler}
          pageHandler={pageHandler}
          totalPage={totalPage}
          page={page}
          setPage={setPage}
          setLocation={setLocation}
          initialCoordinates={{ lng: longitude, lat: latitude }}
        />
      </Grid>
      <Grid item xs={0} lg={5}>
        <Map restaurants={filteredRestaurants} hoverId={hoverId} location={location} />
      </Grid>
    </Grid>
  );
};

export default SearchRestaurant;
