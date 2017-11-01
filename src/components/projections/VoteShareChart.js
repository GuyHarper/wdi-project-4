import React from 'react';

class VoteShareChart extends React.Component {
  render() {
    const chartWidth = 300;
    let voteShare = [];
    if(this.props.modifiedVoteShare) {
      voteShare = this.props.modifiedVoteShare;
    } else {
      voteShare = this.props.voteShare;
    }
    return (
      <div className="vote-share-chart">
        {Object.keys(voteShare).map((party) => {
          const style = {
            width: voteShare[party] * chartWidth
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
                    {(voteShare[party] * 100).toFixed(2)}
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
