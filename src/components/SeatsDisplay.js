import React from 'react';

const SeatsDisplay = ({ constituencyData }) => {
  function compare(a,b) {
    if (a.winner2017 < b.winner2017) {
      return -1;
    } else if(a.winner2017 > b.winner2017) {
      return 1;
    } else {
      return 0;
    }
  }

  constituencyData.sort(compare);

  return (
    <div className="seats-display-container">
      {constituencyData.map((constituency) => {
        return(
          <div key={constituency.code} className={`seat-display ${constituency.winner2017}`}></div>
        );
      })}
    </div>
  );
};

export default SeatsDisplay;
