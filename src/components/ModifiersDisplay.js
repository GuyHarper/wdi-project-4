import React from 'react';

class ModifiersDisplay extends React.Component {

  state = {
    swings: [],
    setSwing: {
      from: '',
      to: '',
      amount: 0
    }
  }

  handleChange = ({ target: { name, value }}) => {
    const setSwing = Object.assign({}, this.state.setSwing, { [name]: value });
    this.setState({ setSwing });
  }

  handleSwingMouseUp = () => {
    this.setState(prevState => {

      const { swings, setSwing } = prevState;
      const existingSwingIndex = swings.findIndex(swing => swing.from === setSwing.from && swing.to === setSwing.to);
      console.log(existingSwingIndex);
      if(existingSwingIndex >= 0) swings.splice(existingSwingIndex, 1);

      swings.push(prevState.setSwing);
      const modifiers = Object.assign({}, prevState, { swings });
      return { modifiers };
    }, () => this.props.setModifier(this.state.swings));
  }

  render() {
    const parties = Object.keys(this.props.voteShare);
    const { setSwing } = this.state;
    return(
      <div>
        <h2>Swing</h2>
        <form>
          <label htmlFor="swing-from">From</label>
          <select id="swing-from" value={setSwing.from} onChange={this.handleChange} name="from">
            <option value="" disabled>Select party</option>
            {parties.map((party) => {
              return(
                <option key={`${party}-from`} value={party}> {party}</option>
              );
            })}
          </select>
          <label htmlFor="swing-to">to</label>
          <select id="swing-to" value={setSwing.to} onChange={this.handleChange} name="to">
            <option value="" disabled>Select party</option>
            {parties.map((party) => {
              return(
                <option key={`${party}-to`} value={party}>{party}</option>
              );
            })}
          </select>
          {setSwing.from && setSwing.to && (setSwing.from !== setSwing.to) &&
            <input type="range" min="0" max={this.props.voteShare[setSwing.from] * 100} defaultValue="0" step="0.1" name="amount" onChange={this.handleChange} onMouseUp={this.handleSwingMouseUp}/>
          }
          <p>{setSwing.amount}</p>
        </form>
      </div>
    );
  }
}
export default ModifiersDisplay;
