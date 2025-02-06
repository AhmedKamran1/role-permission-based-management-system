import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectUserState } from '@/store/user/userSlice';

// Map
import ReactMapGL, { Marker, Source, Layer, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Components
import DetailsCard from './details-card/details-card';

// Styles
import * as Styles from './map.styles';
import { Grid, Tooltip } from '@mui/material';
import { SectionContainer, Text } from '@/components/UI';

// Icons
import MarkerIcon from '@mui/icons-material/Room';
import MyLocationIcon from '@mui/icons-material/MyLocation';

// Helpers
import { getRoute } from '@/helpers/mapHelpers';

// Utils
import { MapProfiles, MapZoomLevels } from '@/utils/constants';

const Map = ({ restaurant }) => {
  const { coordinates } = restaurant.location;
  const longitude = coordinates[0];
  const latitude = coordinates[1];

  const mapRef = useRef(null);

  const user = useSelector(selectUserState);

  const initialView = useMemo(
    () => ({
      latitude,
      longitude,
      zoom: 11,
      minZoom: 5,
    }),
    [latitude, longitude]
  );

  const [viewState, setViewState] = useState(initialView);

  const onMove = useCallback(({ viewState }) => {
    setViewState(viewState);
  }, []);

  const flyToLocation = useCallback((long, lat) => {
    mapRef.current?.flyTo({
      center: [long, lat],
      duration: 1500,
      zoom: MapZoomLevels.MAP_ZOOM,
    });
  }, []);

  const locationHandler = useCallback(async () => {
    flyToLocation(longitude, latitude);
  }, [latitude, longitude, flyToLocation]);

  // useEffect(() => {
  //   getRoute(MapProfiles.DRIVING, user.location.coordinates, coordinates);
  // }, []);

  return (
    <SectionContainer container sx={{ width: '100%', mt: 0 }}>
      <Grid item xs={12}>
        <Styles.Header>
          <Text variant="subHeader" color="primary" fontWeight={500}>
            Find Us
          </Text>
          <Text variant="header" fontWeight={800}>
            Our Location
          </Text>
        </Styles.Header>
      </Grid>
      <Grid item xs={12}>
        <Styles.MapContainer>
          <ReactMapGL
            {...viewState}
            ref={mapRef}
            width="100%"
            height="100%"
            onMove={onMove}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            mapStyle={'mapbox://styles/mapbox/streets-v12'}
          >
            <Marker latitude={latitude} longitude={longitude}>
              <MarkerIcon color="primary" sx={{ fontSize: '3rem' }} />
            </Marker>

            <Tooltip title="location" placement="right" arrow>
              <Styles.MarkerFinder onClick={locationHandler}>
                <MyLocationIcon />
              </Styles.MarkerFinder>
            </Tooltip>

            <DetailsCard restaurant={restaurant} />

            <NavigationControl position={'top-left'} showCompass={false} />
          </ReactMapGL>
        </Styles.MapContainer>
      </Grid>
    </SectionContainer>
  );
};

export default React.memo(Map);
