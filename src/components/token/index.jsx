import React, { Component } from 'react';
import { Circle } from 'react-konva';
import { number } from 'prop-types';

import randomRgb from '../../utils/random-rgb';

class Token extends Component {
  static propTypes = {
    x: number.isRequired,
    y: number.isRequired,
  };

  state = {
    fill: randomRgb(),
  };

  onClick = () => {
    this.setState({
      fill: randomRgb(),
    });
  };

  render() {
    const { x, y } = this.props;
    const { fill } = this.state;

    return (
      <Circle radius={30} x={x} y={y} fill={fill} onClick={this.onClick} />
    );
  }
}

export default Token;
