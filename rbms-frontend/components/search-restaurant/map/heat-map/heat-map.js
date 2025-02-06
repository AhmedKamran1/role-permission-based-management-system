import React, { useMemo } from 'react';
import { Source, Layer } from 'react-map-gl';
import { heatmapLayer } from './heat-map-layer';

const HeatMap = ({ restaurants }) => {
  const heatmapData = useMemo(() => {

    return {
      type: 'FeatureCollection',
      features: restaurants.map((marker) => ({
        type: 'Feature',
        properties: {
          rating: marker.rating,
          count: marker.count,
        },
        geometry: {
          type: marker.location.type,
          coordinates: marker.location.coordinates,
        },
      })),
    };
  }, [restaurants]);

  return (
    <>
      {heatmapData && (
        <Source type="geojson" data={heatmapData}>
          <Layer {...heatmapLayer} />
        </Source>
      )}
    </>
  );
};

export default React.memo(HeatMap);
