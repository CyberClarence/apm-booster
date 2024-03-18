import React, { Component } from "react";

class APMCounter extends Component {
  render() {
    let { elapsedTime, score: correctHitCount } = this.props;

    const APM =
      elapsedTime !== 0 ? Math.floor((correctHitCount / elapsedTime) * 60) : 0;

    return (
      <div className="apm-counter">
        Correct hit: {correctHitCount}
        <br />
        {APM} APM
      </div>
    );
  }
}

export default APMCounter;
