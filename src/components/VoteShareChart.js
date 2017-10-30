import React from 'react';

class VoteShareChart extends React.Component {
  render() {
    const chartWidth = 300;
    const voteShare = this.props.voteShare.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);
    return (
      <div className="vote-share-chart">
        {voteShare.map((partyResult) => {
          const party = Object.keys(partyResult)[0];
          const style = {
            width: partyResult[party] * chartWidth
          };
          return(
            <div key={party} className="row">
              <div className="col-2 party-label justify-content-end">
                <p>
                  {party}
                </p>
              </div>
              <div className="col-10">
                <div className="row align-items-center">
                  <div className={`vote-share ${party}`} style={style}>
                  </div>
                  <p className="vote-share-percentage">
                    {(partyResult[party] * 100).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default VoteShareChart;
