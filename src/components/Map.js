import React from 'react';
import mapGeojsonExport from '../assets/wgs84-projection-fewer-dps';
// import mapGeojsonExport from '../assets/wgs84-projection';
import { geoMercator, geoPath } from 'd3-geo';

class Map extends React.Component {
  render() {
    const projection = geoMercator();
    const pathGenerator = geoPath().projection(projection);
    const constituencies = mapGeojsonExport.features
      .map((d, index) => <path
        key={index}
        d={pathGenerator(d)}
        className='constituency-path'
      />);
    return (
      <svg width="500" height="700" viewBox="480 230 25 20">
        {constituencies}
      </svg>
    );
  }
}

export default Map;
