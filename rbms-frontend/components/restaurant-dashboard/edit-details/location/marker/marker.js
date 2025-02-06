import React, { useState, useCallback, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Marker } from 'react-map-gl';

// Icons
import CancelIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import MyLocationIcon from '@mui/icons-material/MyLocation';

// Styles
import { IconButton, Tooltip } from '@mui/material';
import * as Styles from './marker-styles';

const MapMarker = ({
  newMarker,
  resetMarker,
  coordinates,
  confirmMark,
  flyToLocation,
}) => {
  const [markerPosition, setMarkerPosition] = useState(coordinates);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    flyToLocation();
  }, [flyToLocation]);

  useEffect(() => {
    if (newMarker) {
      setMarkerPosition(newMarker);
      setShowOptions(true);
    }
  }, [newMarker]);

  const confirmLocation = useCallback(
    (event) => {
      try {
        event.stopPropagation();
        confirmMark(markerPosition);
      } catch (e) {
        setMarkerPosition(coordinates);
        enqueueSnackbar({ variant: 'error', message: e.message });
      } finally {
        setShowOptions(false);
      }
    },
    // eslint-disable-next-line
    [markerPosition]
  );

  const handleMarkerDragStart = useCallback(() => {
    setShowOptions(false);
  }, []);

  const handleMarkerDragEnd = useCallback((event) => {
    const { lng, lat } = event.lngLat;
    setMarkerPosition([lng, lat]);
    setShowOptions(true);
  }, []);

  const resetMark = (event) => {
    event.stopPropagation();
    flyToLocation(1000);
    setShowOptions(false);
    setMarkerPosition(coordinates)
    resetMarker();
  };

  return (
    <>
      <Tooltip title="Reset" placement="left" arrow>
        <Styles.ResetMarker onClick={resetMark}>
          <MyLocationIcon />
        </Styles.ResetMarker>
      </Tooltip>

      {markerPosition && (
        <Marker
          draggable={true}
          longitude={markerPosition[0]}
          latitude={markerPosition[1]}
          onDragStart={handleMarkerDragStart}
          onDragEnd={handleMarkerDragEnd}
        >
          <Styles.Pin animating={+showOptions} />
          {showOptions && (
            <Styles.OptionsContainer>
              <Tooltip title="Remove Marker" placement="bottom" arrow>
                <IconButton onClick={resetMark}>
                  <CancelIcon color="error" sx={{ fontWeight: 800, fontSize: '2rem' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Mark location" placement="bottom" arrow>
                <IconButton onClick={confirmLocation}>
                  <DoneIcon color="success" sx={{ fontWeight: 800, fontSize: '2rem' }} />
                </IconButton>
              </Tooltip>
            </Styles.OptionsContainer>
          )}
        </Marker>
      )}
    </>
  );
};

export default React.memo(MapMarker);
