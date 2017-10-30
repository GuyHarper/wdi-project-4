import React from 'react';
import mapGeojsonExport from '../assets/wgs84-projection-fewer-dps';
// import mapGeojsonExport from '../assets/wgs84-projection';
import { geoMercator, geoPath } from 'd3-geo';

class Map extends React.Component {
  render() {
    const constituencies = this.props.constituencyData;
    const projection = geoMercator();
    const pathGenerator = geoPath().projection(projection);
    const constituencyPaths = mapGeojsonExport.features
      .map((d, index) => {
        const constituency = constituencies.find((e) => e.code === d.id);
        if(constituency) {
          let winner = null;
          constituency.winner ? winner = constituency.winner : winner = constituency.winner2017;
          return (
            <path
              key={index}
              data-id={d.id}
              d={pathGenerator(d)}
              className={`constituency-path ${winner}`}
            />
          );
        } else {
          return (
            <path
              key={index}
              data-id={d.id}
              d={pathGenerator(d)}
              className='constituency-path'
            />
          );
        }
      });
    return (
      <svg width="500" height="700" viewBox="480 230 25 20">
        {constituencyPaths}
      </svg>
    );
  }
}

export default Map;
