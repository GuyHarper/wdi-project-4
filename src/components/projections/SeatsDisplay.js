import React from 'react';

const SeatsDisplay = ({ constituencyData }) => {
  function compare(a,b) {
    let constituencyWinnerA = '';
    let constituencyWinnerB = '';
    a.winner ? constituencyWinnerA = a.winner : constituencyWinnerA = a.winner2017;
    b.winner ? constituencyWinnerB = b.winner : constituencyWinnerB = b.winner2017;
    if (constituencyWinnerA < constituencyWinnerB) {
      return -1;
    } else if(constituencyWinnerA > constituencyWinnerB) {
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
          <div key={constituency.code} className={`seat-display ${constituency.winner || constituency.winner2017}`}></div>
        );
      })}
    </div>
  );
};

export default SeatsDisplay;
