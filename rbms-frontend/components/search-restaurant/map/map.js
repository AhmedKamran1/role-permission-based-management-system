import React, { lazy, useMemo, useCallback, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Map
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
const HeatMap = lazy(() => import('./heat-map/heat-map'));

// Styles
import * as Styles from './map.styles';
import { Box, IconButton, Rating, Tooltip } from '@mui/material';
import { FlexContainer, Text } from '@/components/UI';

// Icons
import VisibilityIcon from '@mui/icons-material/Visibility';

// Utils
import { NAV_HEIGHT, MapZoomLevels } from '@/utils/constants';

// Helpers
import { getFileUrl } from '@/helpers/fileHelpers';

const Map = ({ restaurants, hoverId, location }) => {
  const [popupDetails, setPopupDetails] = useState(null);
  const { coordinates } = restaurants.length && restaurants[0]?.location;
  const longitude = (coordinates && coordinates[0]) || location.lng;
  const latitude = (coordinates && coordinates[1]) || location.lat;

  const initialView = useMemo(
    () => ({
      latitude: latitude,
      longitude: longitude,
      zoom: 5,
      minZoom: 4,
    }),
    [latitude, longitude]
  );

  const mapRef = useRef(null);
  const [viewState, setViewState] = useState(initialView);

  useEffect(() => {
    setViewState((prevState) => ({
      ...prevState,
      latitude: latitude,
      longitude: longitude,
      zoom: 10,
    }));
  }, [restaurants, location]);

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

  const popupHandler = (details) => {
    setPopupDetails(details);
  };

  return (
    <Box sx={{ height: `calc(100vh - ${NAV_HEIGHT}px)`, position: 'relative' }}>
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
          {viewState.zoom >= MapZoomLevels.MAX_ZOOM_HEAT_MAP ? (
            restaurants.map((i) => {
              const { coordinates } = i.location;
              return (
                <React.Fragment key={i.slug}>
                  {popupDetails && (
                    <Popup
                      longitude={popupDetails.location.coordinates[0]}
                      latitude={popupDetails.location.coordinates[1]}
                      focusAfterOpen={false}
                      closeButton={false}
                      closeOnClick={false}
                      offset={{
                        bottom: [0, -20],
                      }}
                    >
                      <Image
                        src={
                          (popupDetails.cover &&
                            getFileUrl(
                              process.env.NEXT_PUBLIC_AWS_S3_RESTAURANTS_BUCKET,
                              `${popupDetails.id}/cover/${popupDetails.cover}`
                            )) ||
                          '/assets/images/bg-placeholder.png'
                        }
                        alt="restaurant"
                        height={150}
                        width={220}
                        style={{ borderRadius: '5px' }}
                      />
                      <FlexContainer sx={{ justifyContent: 'space-between' }}>
                        <Text variant="body" fontWeight={600}>
                          {popupDetails.name}
                        </Text>
                        <Link href={`/restaurant/${popupDetails.slug}`} target="_blank">
                          <IconButton color="primary" sx={{ p: 0.5 }}>
                            <Tooltip title="View Restaurant" arrow>
                              <VisibilityIcon fontSize="small" />
                            </Tooltip>
                          </IconButton>
                        </Link>
                      </FlexContainer>
                      <FlexContainer sx={{ justifyContent: 'space-between' }}>
                        <Rating value={popupDetails.rating} size="small" readOnly />
                        <Text variant="sub">
                          {popupDetails.rating} ({popupDetails.count} reviews)
                        </Text>
                      </FlexContainer>
                      <Text
                        variant="sub"
                        sx={{
                          fontSize: '0.75rem',
                          color: 'text.ternary',
                        }}
                      >
                        {popupDetails.categories.join(', ')}
                      </Text>
                    </Popup>
                  )}
                  <Marker
                    key={i.slug}
                    longitude={coordinates[0]}
                    latitude={coordinates[1]}
                  >
                    {i.featuredTill ? (
                      <Styles.FeaturedPin
                        hovering={+(i.id === hoverId)}
                        onMouseOver={() => popupHandler(i)}
                      />
                    ) : (
                      <Styles.Pin
                        hovering={+(i.id === hoverId)}
                        onMouseOver={() => popupHandler(i)}
                      />
                    )}
                  </Marker>
                </React.Fragment>
              );
            })
          ) : (
            <HeatMap restaurants={restaurants} />
          )}
          <NavigationControl position={'bottom-right'} showCompass={false} />
        </ReactMapGL>
      </Styles.MapContainer>
    </Box>
  );
};

export default React.memo(Map);
