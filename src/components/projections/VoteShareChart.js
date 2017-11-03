import React from 'react';

class VoteShareChart extends React.Component {
  render() {
    const chartWidth = 300;
    let voteShare = [];
    if(this.props.modifiedVoteShare) {
      voteShare = {...this.props.modifiedVoteShare};
    } else {
      voteShare = {...this.props.voteShare};
    }
    const removeParties = ['sdlp', 'uup', 'alliance'];
    voteShare.other = voteShare.other + voteShare.sdlp + voteShare.uup + voteShare.alliance;
    removeParties.forEach((partyCode) => {
      if(voteShare[partyCode]) delete voteShare[partyCode];
    });
    return (
      <div className="vote-share-chart">
        <h2 className="h4">Vote share</h2>
        <div className="row">
          <div className="col-6">
            {Object.keys(voteShare).slice(0,5).map((party) => {
              const style = {
                width: voteShare[party] * chartWidth
              };
              return(
                <div key={party} className="row">
                  <div className="col-4 party-label justify-content-end">
                    <p>
                      {this.props.partyCodes[party]}
                    </p>
                  </div>
                  <div className="col-8">
                    <div className="row align-items-center">
                      <div className={`vote-share ${party}`} style={style}>
                      </div>
                      <p className="vote-share-percentage">
                        {(voteShare[party] * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-6">
            {Object.keys(voteShare).slice(5,voteShare.length).map((party) => {
              const style = {
                width: voteShare[party] * chartWidth
              };
              return(
                <div key={party} className="row">
                  <div className="col-4 party-label justify-content-end">
                    <p>
                      {this.props.partyCodes[party]}
                    </p>
                  </div>
                  <div className="col-8">
                    <div className="row align-items-center">
                      <div className={`vote-share ${party}`} style={style}>
                      </div>
                      <p className="vote-share-percentage">
                        {(voteShare[party] * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default VoteShareChart;
