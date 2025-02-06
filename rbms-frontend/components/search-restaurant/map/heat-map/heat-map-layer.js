// Utils
import { MapZoomLevels } from '@/utils/constants';

const maxZoom = MapZoomLevels.MAX_ZOOM_HEAT_MAP;

export const heatmapLayer = {
  id: "heatmap",
  maxzoom: maxZoom,
  type: "heatmap",
  paint: {
    "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, maxZoom, 2],
    'heatmap-weight': {
      property: 'rating',
      type: 'exponential',
      stops: [[1, 0],[5, 1]]
    },
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.2,
      'rgb(103,169,207)',
      0.4,
      'rgb(209,229,240)',
      0.6,
      'rgb(253,219,199)',
      0.8,
      'rgb(239,138,98)',
      1,
      'rgb(178,24,43)'
  ],
    "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, maxZoom, 17],
    "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, maxZoom, 0.75],
  },
};
