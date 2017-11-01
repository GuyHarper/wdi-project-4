import React from 'react';

class ModifiersDisplay extends React.Component {

  state = {
    swings: [],
    setSwing: {
      from: '',
      to: '',
      amount: 0
    },
    newSwingToggle: false
  }

  handleNewSwingChange = ({ target: { name, value }}) => {
    this.setState(prevState => {
      const setSwing = Object.assign({}, prevState.setSwing, { [name]: value });
      const swings = [...prevState.swings];
      if(this.state.newSwingToggle && setSwing.from && setSwing.to) {
        swings.push(setSwing);
        const modifiers = Object.assign({}, { setSwing, swings, newSwingToggle: false });
        return modifiers;
      } else {
        const modifiers = Object.assign({}, { setSwing, swings });
        return modifiers;
      }
    }, () => {
      console.log(this.state);
    });
  }


  handleExistingSwingChange = ({ target }) => {
    this.setState({ setSwing: { from: target.getAttribute('data-from'), to: target.getAttribute('data-to'), amount: target.value }});
  }

  handleSwingMouseUp = () => {
    this.setState(prevState => {

      const { swings, setSwing } = prevState;
      const existingSwingIndex = swings.findIndex(swing => swing.from === setSwing.from && swing.to === setSwing.to);
      if(existingSwingIndex >= 0) swings.splice(existingSwingIndex, 1);
      // fix this - need swings not changing order on mouseup when updating previous
      swings.push(prevState.setSwing);
      const modifiers = Object.assign({}, prevState, { swings });
      return { modifiers };
    }, () => {
      console.log(this.state);
      this.props.setModifier(this.state.swings);
    });
  }

  handleAddSwingClick = () => {
    this.setState({ setSwing: { from: '', to: '', amount: 0 }, newSwingToggle: true });
  }

  render() {
    const { setSwing, swings } = this.state;
    const partiesTo = Object.keys(this.props.voteShare);
    const partiesFrom = Object.keys(this.props.voteShare);
    if(setSwing.to) {
      partiesFrom.splice(partiesFrom.indexOf(setSwing.from), 1);
      swings.forEach(swing => {
        if(setSwing.to === swing.to) partiesFrom.splice(partiesFrom.indexOf(swing.from), 1);
        if(setSwing.to === swing.from) partiesFrom.splice(partiesFrom.indexOf(swing.to), 1);
      });
    }
    if(setSwing.from) {
      partiesTo.splice(partiesTo.indexOf(setSwing.from), 1);
      swings.forEach(swing => {
        if(setSwing.from === swing.from) partiesTo.splice(partiesTo.indexOf(swing.to), 1);
        if(setSwing.from === swing.to) partiesTo.splice(partiesTo.indexOf(swing.from), 1);
      });
    }
    return(
      <div>
        <h2>Swings</h2>
        {this.state.swings.length > 0 && this.state.swings.map((swing, i) => {
          return(
            <div key={i}>
              <p>From {swing.from} to {swing.to}</p>
              <input type="range" min="0" max={this.props.voteShare[swing.from] * 100} defaultValue="0" step="0.1" name="amount" onChange={this.handleExistingSwingChange} onMouseUp={this.handleSwingMouseUp} data-from={swing.from} data-to={swing.to}/>
              <p>{swing.amount}</p>
            </div>
          );
        })}
        {!this.state.newSwingToggle && <button className="btn btn-primary" onClick={this.handleAddSwingClick}>Add Swing</button>}
        {this.state.newSwingToggle &&
          <form>
            <label htmlFor="swing-from">From</label>
            <select id="swing-from" value={setSwing.from} onChange={this.handleNewSwingChange} name="from">
              <option value="" disabled>Select party</option>
              {partiesFrom.map((party) => {
                return(
                  <option key={`${party}-from`} value={party}> {party}</option>
                );
              })}
            </select>
            <label htmlFor="swing-to">to</label>
            <select id="swing-to" value={setSwing.to} onChange={this.handleNewSwingChange} name="to">
              <option value="" disabled>Select party</option>
              {partiesTo.map((party) => {
                return(
                  <option key={`${party}-to`} value={party}>{party}</option>
                );
              })}
            </select>
          </form>
        }
      </div>
    );
  }
}
export default ModifiersDisplay;
