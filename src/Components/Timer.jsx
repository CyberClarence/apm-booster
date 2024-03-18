import React, { Component } from "react";

class GameTimer extends Component {
  state = {
    intervalID: null,
    startTime: new Date(),
    timer: 0,
  };

  componentDidMount = () => {
    const intervalID = setInterval(() => this.updateTimer(), 100);
    this.setState({ intervalID });
    setTimeout(() => {
      clearInterval(intervalID);
      let { history } = this.props;
      history.replace("/score");
    }, this.props.timeLimit * 1000);
  };

  componentWillUnmount = () => {
    let { intervalID } = this.state;
    clearInterval(intervalID);
  };

  updateTimer = () => {
    let { startTime } = this.state;
    let { timeLimit } = this.props;

    let delta = new Date() - startTime;
    // Je veux 2 décimales = round(x/100)*100
    delta = Math.floor(delta / 100) * 100;
    // passe de ms à secondes
    delta = delta / 1000;

    if (delta >= timeLimit) return;

    this.setState({ timer: delta });
    this.props.onTimerUpdate(delta);
  };

  render() {
    const { timer } = this.state;

    return <div id="timer">timer: {timer}</div>;
  }
}

export default GameTimer;
