import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import { connect } from 'react-redux';
import { number } from 'prop-types';

import Token from 'components/token';

import './style.scss';

class App extends Component {
  static propTypes = {
    width: number.isRequired,
    height: number.isRequired,
  };

  state = { text: 'fetching...' };

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
    const { width, height } = this.props;
    const hw = width / 2;
    const hh = height / 2;

    return (
      <div className="app">
        <Stage className="stage" width={width} height={height}>
          <Layer>
            <Token x={hw} y={hh} radius={48} />
          </Layer>
        </Stage>
        <h1>{this.state.text}</h1>
        <button onClick={this.handleClick}>a new one</button>
      </div>
    );
  }
}

export default connect(state => state)(App);
