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
    });
  }

  handleExistingSwingChange = ({ target }) => {
    this.setState({ setSwing: { from: target.getAttribute('data-from'), to: target.getAttribute('data-to'), amount: target.value }});
  }

  handleSwingMouseUp = () => {
    this.setState(prevState => {
      const { swings, setSwing } = prevState;
      const existingSwingIndex = swings.findIndex(swing => swing.from === setSwing.from && swing.to === setSwing.to);
      swings.splice(existingSwingIndex, 1, prevState.setSwing);
      const modifiers = Object.assign({}, prevState, { swings });
      return { modifiers };
    }, () => {
      this.props.setModifier(this.state.swings);
    });
  }

  handleAddSwingClick = () => {
    this.setState({ setSwing: { from: '', to: '', amount: 0 }, newSwingToggle: true });
  }

  render() {
    const { setSwing, swings } = this.state;
    const partiesTo = Object.keys(this.props.voteShare);
    partiesTo.splice(partiesTo.indexOf('other'),1);
    const partiesFrom = Object.keys(this.props.voteShare);
    partiesFrom.splice(partiesFrom.indexOf('other'),1);
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
    const swingsDisplay = [...swings];
    swingsDisplay.map((swing) => {
      if(setSwing.from === swing.from && setSwing.to === swing.to) swing.amount = setSwing.amount;
      swing.sliderClass = `slider from-${swing.from} to-${swing.to}`;
      return swing;
    });

    return(
      <div className="modifiers-display">
        <h2 className="h4">Swings</h2>
        {swingsDisplay.length > 0 && swingsDisplay.map((swing, i) => {
          return(
            <div key={i} className="row">
              <p className="col-5">From {this.props.partyCodes[swing.from]} to {this.props.partyCodes[swing.to]}</p>
              <div className="col-6 slider-container">
                <input type="range" min="0" max={this.props.voteShare[swing.from] * 100} defaultValue="0" step="0.1" name="amount" onChange={this.handleExistingSwingChange} onMouseUp={this.handleSwingMouseUp} data-from={swing.from} data-to={swing.to} className={swing.sliderClass} />
              </div>
              <p className="col-1">{swing.amount}%</p>
            </div>
          );
        })}
        {!this.state.newSwingToggle && <button className="btn btn-outline-primary btn-sm" onClick={this.handleAddSwingClick} style={{marginRight: '5px'}}>Add Swing</button>}
        {!this.state.newSwingToggle && this.state.swings.length > 0 && <button className="btn btn-outline-primary btn-sm" onClick={this.props.handleSaveClick}>Save projection</button>}
        {this.state.newSwingToggle &&
          <form className="row">
            <label htmlFor="swing-from" className="col-2">From</label>
            <select id="swing-from" value={setSwing.from} onChange={this.handleNewSwingChange} name="from" className="col-2">
              <option value="" disabled>Select party</option>
              {partiesFrom.map((party) => {
                return(
                  <option key={`${party}-from`} value={party}>{this.props.partyCodes[party]}</option>
                );
              })}
            </select>
            <label htmlFor="swing-to" className="col-1">to</label>
            <select id="swing-to" value={setSwing.to} onChange={this.handleNewSwingChange} name="to" className="col-2">
              <option value="" disabled>Select party</option>
              {partiesTo.map((party) => {
                return(
                  <option key={`${party}-to`} value={party}>{this.props.partyCodes[party]}</option>
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
