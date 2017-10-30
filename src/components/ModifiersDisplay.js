import React from 'react';

class ModifiersDisplay extends React.Component {

  state = {
    modifiers: {
      swings: [],
      setSwing: {
        from: '',
        to: '',
        amount: 0
      }
    }
  }

  handlePartySelectChange = (e) => {
    if(e.target.getAttribute('data-fromto') === 'from') {
      const newState = { ...this.state };
      newState.modifiers.setSwing.from = e.target.value;
      this.setState({ ...newState });
    } else if(e.target.getAttribute('data-fromto') === 'to') {
      const newState = { ...this.state };
      newState.modifiers.setSwing.to = e.target.value;
      this.setState({ ...newState });
    }
  }

  handleSwingChange = (e) => {
    const newState = { ...this.state };
    newState.modifiers.setSwing.amount = e.target.value;
    this.setState({ ...newState });
  }

  handleSwingMouseUp = () => {
    this.props.setModifier(this.state.modifiers.setSwing);
  }

  render() {
    const parties = this.props.voteShare.map((partyResult) => {
      return Object.keys(partyResult)[0];
    });
    return(
      <div>
        <h2>Swing</h2>
        <form>
          <label htmlFor="swing-from">From</label>
          <select id="swing-from" defaultValue="" onChange={this.handlePartySelectChange} data-fromto="from">
            <option value="" disabled>Select party</option>
            {parties.map((party) => {
              return(
                <option key={`${party}-from`} value={party}> {party}</option>
              );
            })}
          </select>
          <label htmlFor="swing-to">to</label>
          <select id="swing-to" defaultValue="" onChange={this.handlePartySelectChange} data-fromto="to">
            <option value="" disabled>Select party</option>
            {parties.map((party) => {
              return(
                <option key={`${party}-to`} value={party}>{party}</option>
              );
            })}
          </select>
          {this.state.modifiers.setSwing.from && this.state.modifiers.setSwing.to && (this.state.modifiers.setSwing.from !== this.state.modifiers.setSwing.to) &&
            <input type="range" min="-50" max="50" defaultValue="0" step="0.1" onChange={this.handleSwingChange} onMouseUp={this.handleSwingMouseUp}/>
          }
          <p>{this.state.modifiers.setSwing.amount}</p>
        </form>
      </div>
    );
  }
}
export default ModifiersDisplay;
