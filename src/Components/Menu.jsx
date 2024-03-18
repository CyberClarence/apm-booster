import React, { Component } from "react";

class Menu extends Component {
  componentDidMount = () => {
    this.props.handleScoreReset();
  };
  handleGameStart = () => {
    let { history } = this.props;
    history.replace("/test");
  };

  render() {
    let { onKeysConfigChange, currentKeysConfig } = this.props;
    console.log(typeof onKeysConfigChange);
    return (
      <div id="menu">
        <h3>APM BOOSTER</h3>
        <div id="menu-param">
          <div>grid size: 5x5</div>
          <div>density: 3</div>
          <div>
            <span>keys:</span>
            <select onChange={onKeysConfigChange} value={currentKeysConfig}>
              <option value="qwer">qwer</option>
              <option value="azer">azer</option>
              <option value="azerqsdfwxcv1234">SC2 GOD</option>
            </select>
          </div>
          <div>timer: 30</div>
        </div>
        <button onClick={this.handleGameStart}> Play ! </button>
      </div>
    );
  }
}

export default Menu;
