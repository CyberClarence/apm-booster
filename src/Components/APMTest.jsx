import React, { Component } from "react";
import { gen2DArray, randChar, randInt0 } from "../Utils/Utils";
import GameTimer from "./Timer";

const Square = ({ value, onMouseOver, clicked }) => {
  const backgroundColor = clicked ? "green" : "black";
  const fontSize = clicked ? "250%" : "400%";
  return (
    <div
      className="square"
      onMouseOver={onMouseOver}
      style={{
        backgroundColor,
        fontSize,
      }}
    >
      {value === "" ? (clicked ? "+1" : "") : value.toUpperCase()}
    </div>
  );
};

class ApmTest extends Component {
  state = {
    grid: [],
    mousePos: { x: -1, y: -1 },
    keys: [],
  };

  componentDidMount = () => {
    this.resetGame();
    // window.onkeypress = this.handleKeyPress;

    window.onkeydown = ({ key }) => {
      this.setState({ keys: [...this.state.keys, key] });
      if (this.state.keys.length === 1) {
        this.handleKeyPress({ key });
      }
    };

    window.onkeyup = ({ key }) => {
      const keys = this.state.keys.filter((k) => k !== key);
      this.setState({ keys });
    };

    document
      .getElementById("apm-test")
      .addEventListener("contextmenu", (event) => event.preventDefault());
  };

  componentWillUnmount = () => {
    window.onkeydown = null;
    window.onkeyup = null;
  };

  resetGame = () => {
    this.resetGrid();
    this.resetMousePos();
  };

  resetGrid = () => {
    let { size } = this.props;
    // * on oublie pas le callback pour ajouter le bon nombre d'element
    this.setState({ grid: gen2DArray(size, size, "") }, this.onGridReset);
  };

  onGridReset = () => {
    let { density } = this.props;

    for (let k = 1; k <= density; ++k) {
      this.spawnANewSquare();
    }
  };

  handleKeyPress = ({ key }) => {
    let { grid, mousePos } = this.state;

    let { x, y } = mousePos;

    // * au cas ou la souris sort de l'écran
    if (x === -1 && y === -1) return;

    // * pour pas que l'utilisateur est à appuyer sur maj
    key = key.toLowerCase();

    if (key === grid[y][x].toLowerCase()) {
      this.spawnANewSquare();
      grid[y][x] = "";

      this.setState({ grid });
      this.props.onScoreUpdate(1);
    } else {
      this.props.onScoreUpdate(-1);
    }
  };

  resetMousePos = () => {
    this.setState({ mousePos: { x: -1, y: -1 } });
  };

  updateMousePos = (x, y) => {
    let mousePos = { ...this.state.mousePos };
    mousePos.x = x;
    mousePos.y = y;

    this.setState({ mousePos });
  };

  spawnANewSquare = () => {
    let { grid } = this.state;
    let { size: gridSize, keys } = this.props;

    let x, y;

    do {
      x = randInt0(gridSize);
      y = randInt0(gridSize);
      // * coordonnée aléatoire sur la grille non déjà prise
    } while (grid[y][x] !== "");

    grid[y][x] = randChar(keys);
    this.setState({ grid });
  };

  render() {
    let { grid, keys, mousePos } = this.state;

    return (
      <React.Fragment>
        <div>keys: {keys}</div>
        <div id="apm-test" onMouseOut={this.resetMousePos}>
          {grid.map((row, y) => (
            <div className="test-row" key={y}>
              {row.map((value, x) => (
                <Square
                  value={value}
                  key={x + "" + y}
                  onMouseOver={() => this.updateMousePos(x, y)}
                  clicked={
                    mousePos.x === x && mousePos.y === y && keys.length >= 1
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default ApmTest;
