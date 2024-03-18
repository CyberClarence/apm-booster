import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import APMCounter from "./Components/APMCounter";
import ApmTest from "./Components/APMTest";
import Result from "./Components/Result";
import Menu from "./Components/Menu";
import GameTimer from "./Components/Timer";

class App extends Component {
  state = {
    score: 0,
    missCount: 0,
    elapsedTime: 0,
    config: {
      gridSize: 4,
      keys: "qwer",
      density: 3,
      timeLimit: 30,
      sound: "on",
    },
  };

  componentDidMount = () => {
    let { config } = this.state;
    let { keys } = localStorage;
    const newKeys = keys === undefined ? "qwer" : keys;
    this.setState({ config: { ...config, keys: newKeys } });
  };

  handleScoreUpdate = (variation) => {
    let { score, missCount, config } = this.state;
    if (variation > 0) {
      this.setState({ score: score + 1 });
      if (config.sound === "on") {
        let audio = new Audio("/sound/low.mp3");
        audio.play();
      }
    } else {
      this.setState({ missCount: missCount + 1, score: score - 1 });
      if (config.sound === "on") {
        let audio = new Audio("/sound/combobreak.ogg");
        audio.play();
      }
    }
  };

  handleScoreReset = () => {
    this.setState({ score: 0, missCount: 0, elapsedTime: 0 });
  };

  handleElapsedTimeUpdate = (updatedTimerValue) => {
    this.setState({ elapsedTime: updatedTimerValue });
  };

  updateKeysConfig = ({ target: { value: newKeys } }) => {
    let { config } = this.state;
    this.setState({ config: { ...config, keys: newKeys } }, () => {
      console.log("updated key config to ", this.state.config.keys);
      localStorage.keys = newKeys;
    });
  };

  render() {
    let { score, missCount, elapsedTime, config } = this.state;

    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/menu"
            render={(props) => (
              <Menu
                {...props}
                handleScoreReset={this.handleScoreReset}
                onKeysConfigChange={this.updateKeysConfig}
                currentKeysConfig={config.keys}
              />
            )}
          />

          <Route
            path="/test"
            render={(props) => (
              <React.Fragment>
                <APMCounter
                  score={score}
                  missCount={missCount}
                  elapsedTime={elapsedTime}
                  onTimerUpdate={this.handleElapsedTimeUpdate}
                  onTimerEnd={this.handleTimerEnd}
                />
                <GameTimer
                  {...props}
                  timeLimit={config.timeLimit}
                  onTimerUpdate={this.handleElapsedTimeUpdate}
                />
                <ApmTest
                  size={config.gridSize}
                  keys={config.keys}
                  density={config.density}
                  onScoreUpdate={this.handleScoreUpdate}
                />
              </React.Fragment>
            )}
          />
          <Route
            path="/score"
            render={(props) => (
              <Result
                {...props}
                score={score}
                keys={config.keys}
                missCount={missCount}
                elapsedTime={config.timeLimit}
                menuReturn={this.handleMenuReturn}
                handleScoreReset={this.handleScoreReset}
                gridSize={config.gridSize}
              />
            )}
          />
          <Redirect to="/menu" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
