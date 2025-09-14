export const regions = [
  { id: 'indian-ocean', name: 'Indian Ocean', stat: '128 active floats', geoJson: null, boundingBox: [[-40, 40], [30, 100]] },
  { id: 'bay-of-bengal', name: 'Bay of Bengal', stat: '32 active floats', geoJson: null, boundingBox: [[5, 78], [25, 100]] },
  { id: 'arabian-sea', name: 'Arabian Sea', stat: '64 active floats', geoJson: null, boundingBox: [[5, 50], [25, 78]] },
];

export const floatData = [
  { wmoId: '5903932', status: 'Active', lastUpdate: '2025-09-06', depthRange: '0-2000m' },
  { wmoId: '5903933', status: 'Inactive', lastUpdate: '2025-09-04', depthRange: '0-2000m' },
  { wmoId: '5903934', status: 'Active', lastUpdate: '2025-09-06', depthRange: '0-2000m' },
  { wmoId: '5903935', status: 'Error', lastUpdate: '2025-09-01', depthRange: '0-2000m' },
];

export const dashboardStats = {
  'indian-ocean': {
    activeFloats: 128,
    profiles30Days: 4500,
    qcGood: 95
  },
  'bay-of-bengal': {
    activeFloats: 32,
    profiles30Days: 1400,
    qcGood: 98
  },
  'arabian-sea': {
    activeFloats: 64,
    profiles30Days: 2800,
    qcGood: 96
  }
};

export const timeSeriesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  temperature: [25, 26, 25.5, 27, 26.8, 28, 28.5, 27.9, 27.5],
  salinity: [34.5, 34.6, 34.4, 34.7, 34.6, 34.8, 34.9, 34.7, 34.6]
};

export const heatmapData = [
  { z: [[10, 20, 30], [20, 30, 40], [30, 40, 50]], x: ['100m', '200m', '300m'], y: ['Day 1', 'Day 2', 'Day 3'] }
];

export const chatResponses = [
  {
    insight: "Temperature in the Bay of Bengal has increased by 0.5°C over the last 6 months.",
    chartThumbnail: "temp-trend.png",
    badges: [
      { label: 'QC', value: '✅' },
      { label: 'n', value: 142 },
      { label: 'Δ', value: '+0.5°C' }
    ]
  },
  {
    insight: "Salinity shows a slight decrease in the top 500m depth range.",
    chartThumbnail: "sal-trend.png",
    badges: [
      { label: 'QC', value: '✅' },
      { label: 'n', value: 89 },
      { label: 'Δ', value: '-0.1 PSU' }
    ]
  }
];