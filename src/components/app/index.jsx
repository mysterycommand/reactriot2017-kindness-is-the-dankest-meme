import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Token from 'components/token';
import Dungeon from 'components/dungeon';

import './style.scss';

import { generateDungeon } from '../../utils/dungeon';

class App extends Component {
  state = { text: 'fetching...', dungeon: generateDungeon(2) };

  componentDidMount() {
    this.fetch();
  }

  handleClick = () => {
    this.setState(
      {
        text: 'fetching....',
      },
      this.fetch,
    );
  };

  fetch() {
    fetch(`${process.env.API_ROOT}/api/test`).then(r => r.json()).then(json => {
      this.setState({
        text: json.message,
      });
    });
  }

  render() {
    const w = 480;
    const h = 270;
    const hw = w / 2;
    const hh = h / 2;

    return (
      <div className="app">
        <Stage className="app" width={w} height={h}>
          <Layer>
            <Token x={hw} y={hh} radius={48} />
          </Layer>
        </Stage>
        <h1>{this.state.text}</h1>
        <button onClick={this.handleClick}>a new one</button>

        <Dungeon dungeon={this.state.dungeon} />
      </div>
    );
  }
}

export default App;
