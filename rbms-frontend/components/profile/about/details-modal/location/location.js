import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react';

// Map
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Styles
import * as Styles from './location.styles';
import { Tooltip } from '@mui/material';

// Icons
import MarkerIcon from '@mui/icons-material/Room';
import MyLocationIcon from '@mui/icons-material/MyLocation';

// Helpers
import { fetchCountry } from '@/helpers/mapHelpers';

// Utils
import { MapZoomLevels } from '@/utils/constants';

const Location = ({ location, updateLocation }) => {
  const { coordinates } = location;
  const longitude = (coordinates && coordinates[0]) || 0;
  const latitude = (coordinates && coordinates[1]) || 0;

  const mapRef = useRef(null);

  const initialView = useMemo(
    () => ({
      latitude,
      longitude,
      zoom: coordinates ? MapZoomLevels.MAP_ZOOM : 1,
      minZoom: coordinates ? MapZoomLevels.MAP_ZOOM : 1,
    }),
    [coordinates, latitude, longitude]
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
    if (coordinates) {
      flyToLocation(longitude, latitude);
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { longitude: long, latitude: lat } = position.coords;
      const loc = await fetchCountry(long, lat);
      updateLocation(loc);
      flyToLocation(long, lat);
    } catch (error) {
      console.error('Error getting location:', error);
    }

    // eslint-disable-next-line
  }, [coordinates, latitude, longitude, flyToLocation]);

  return (
    <Styles.UserMapContainer>
      <ReactMapGL
        {...viewState}
        ref={mapRef}
        width="100%"
        height="100%"
        onMove={onMove}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle={'mapbox://styles/mapbox/streets-v12'}
      >
        {coordinates && (
          <Marker latitude={latitude} longitude={longitude}>
            <MarkerIcon color="primary" sx={{ fontSize: '2.5rem' }} />
          </Marker>
        )}

        <Tooltip title="location" placement="top" arrow>
          <Styles.UserMarkerFinder onClick={locationHandler}>
            <MyLocationIcon />
          </Styles.UserMarkerFinder>
        </Tooltip>

        <NavigationControl position={'bottom-right'} showCompass={false} />
      </ReactMapGL>
    </Styles.UserMapContainer>
  );
};

export default React.memo(Location);
