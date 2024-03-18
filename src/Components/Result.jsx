import React, { Component, useEffect } from "react";
import APMCounter from "./APMCounter";

class Result extends Component {
  handleMenuReturn = () => {
    let { history } = this.props;
    history.replace("/menu");
  };

  handleRedivy = () => {
    let { history } = this.props;
    this.props.handleScoreReset();
    history.replace("/test");
  };

  render() {
    let {
      score: correctHitCount,
      missCount,
      elapsedTime,
      keys,
      gridSize,
    } = this.props;
    const APM =
      elapsedTime !== 0 ? Math.floor((correctHitCount / elapsedTime) * 60) : 0;

    return (
      <div id="result">
        <h3>Result</h3>
        <div id="result-stats">
          <div id="result-APM">
            <span>{APM} APM</span>
            <small>(estimated action per minute)</small>
          </div>
          <div>
            <div className="name">TIMER</div>
            <div className="value">{elapsedTime}</div>
          </div>
          <div>
            <div className="name">KEYS</div>
            <div className="value">
              x{keys.length} [{keys.toUpperCase()}]
            </div>
          </div>
          <div>
            <div className="name">GRID SIZE</div>
            <div className="value">
              {gridSize}x{gridSize}
            </div>
          </div>
          <div>
            <div className="name">Input</div>
            <div className="value">
              <span id="correct">{correctHitCount}</span>/
              <span id="miss">{missCount}</span>
            </div>
          </div>
          <div>
            <div className="name">Your rank</div>
            <div className="value">E-girl</div>
          </div>
        </div>

        <button onClick={this.handleMenuReturn}> Return to menu </button>
        <button onClick={this.handleRedivy}> Retry </button>
      </div>
    );
  }
}

export default Result;
