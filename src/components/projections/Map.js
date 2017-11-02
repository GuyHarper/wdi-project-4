import React from 'react';
import mapGeojsonExport from '../../assets/wgs84-projection-fewer-dps';
// import mapGeojsonExport from '../../assets/wgs84-projection';
import { geoMercator, geoPath } from 'd3-geo';

class Map extends React.Component {
  render() {
    const constituencies = this.props.constituencyData;
    const totalSeats = {
      con: 0,
      lab: 0,
      ld: 0,
      snp: 0,
      ukip: 0,
      green: 0,
      dup: 0,
      sf: 0,
      pc: 0,
      sdlp: 0,
      uup: 0,
      alliance: 0,
      otherWinner: 0
    };
    const projection = geoMercator();
    const pathGenerator = geoPath().projection(projection);
    const constituencyPaths = mapGeojsonExport.features
      .map((d, index) => {
        const constituency = constituencies.find((e) => e.code === d.id);
        if(constituency) {
          if(constituency.winner) {
            totalSeats[constituency.winner] += 1;
          } else if(constituency.winner2017) {
            totalSeats[constituency.winner2017] += 1;
          }
          return (
            <path
              key={index}
              data-id={d.id}
              d={pathGenerator(d)}
              className={`constituency-path ${constituency.winner || constituency.winner2017}`}
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
      <svg width="100%" height="93vh" viewBox="482 224 19 30">
        {constituencyPaths}
      </svg>
    );
  }
}

export default Map;
