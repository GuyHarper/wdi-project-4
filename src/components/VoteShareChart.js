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
            <div key={party}>
              <div className={`vote-share ${party}`} style={style}>
              </div>
              <p>
                {(partyResult[party] * 100).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default VoteShareChart;
