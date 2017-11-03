import React from 'react';

class SeatsDisplay extends React.Component {
  state = {
    seatsDisplayToggle: true
  }

  toggleDisplay = () => {
    this.setState({ seatsDisplayToggle: !this.state.seatsDisplayToggle}, () => console.log(this.state));
  }

  render() {
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

    this.props.constituencyData.sort(compare);
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
    this.props.constituencyData.map(constituency => {
      if(constituency.winner) {
        totalSeats[constituency.winner] += 1;
      } else if(constituency.winner2017) {
        totalSeats[constituency.winner2017] += 1;
      }
    });
    const partyCodes = {
      con: 'Con',
      lab: 'Lab',
      ld: 'Lib Dems',
      snp: 'SNP',
      ukip: 'UKIP',
      green: 'Green',
      dup: 'DUP',
      sf: 'SF',
      pc: 'Plaid Cymru',
      otherWinner: 'Other'
    };
    const chartWidth = 300;


    return (
      <div>
        <h2 className="h4">Seats</h2>
        {this.state.seatsDisplayToggle && <div className="seats-display-container">
          {this.props.constituencyData.map((constituency) => {
            return(
              <div key={constituency.code} className={`seat-display ${constituency.winner || constituency.winner2017}`}></div>
            );
          })}
        </div>}
        {!this.state.seatsDisplayToggle && <div className="seats-chart">
          <div className="row">
            <div className="col-6">
              {Object.keys(partyCodes).slice(0,5).map((party) => {
                const style = {
                  width: totalSeats[party] / 650 * chartWidth
                };
                return(
                  <div key={party} className="row">
                    <div className="col-4 party-label justify-content-end">
                      <p>
                        {partyCodes[party]}
                      </p>
                    </div>
                    <div className="col-8">
                      <div className="row align-items-center">
                        <div className={`total-seats ${party}`} style={style}>
                        </div>
                        <p className="total-seats-number">
                          {totalSeats[party]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-6">
              {Object.keys(partyCodes).slice(6,partyCodes.length).map((party) => {
                const style = {
                  width: totalSeats[party] / 650 * chartWidth
                };
                return(
                  <div key={party} className="row">
                    <div className="col-4 party-label justify-content-end">
                      <p>
                        {partyCodes[party]}
                      </p>
                    </div>
                    <div className="col-8">
                      <div className="row align-items-center">
                        <div className={`total-seats ${party}`} style={style}>
                        </div>
                        <p className="total-seats-number">
                          {totalSeats[party]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>}
        {this.state.seatsDisplayToggle && <button className="btn btn-outline-primary btn-sm" onClick={this.toggleDisplay} style={{marginRight: '5px'}}>Display as bar chart</button>}
        {!this.state.seatsDisplayToggle && <button className="btn btn-outline-primary btn-sm" onClick={this.toggleDisplay} style={{marginRight: '5px'}}>Display as seats</button>}
      </div>
    );
  }
}

export default SeatsDisplay;
