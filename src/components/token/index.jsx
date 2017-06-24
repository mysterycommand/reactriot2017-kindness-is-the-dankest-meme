import React, { Component } from 'react';
import { Group, Circle } from 'react-konva';
import { number } from 'prop-types';

import randomRgb from '../../utils/random-rgb';

class Token extends Component {
  static propTypes = {
    x: number,
    y: number,
    radius: number,
  };

  static defaultProps = {
    x: 0,
    y: 0,
    radius: 10,
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
    const { x, y, radius } = this.props;
    const { fill } = this.state;

    const strokeWidth = 8;
    const halfStrokeWidth = strokeWidth / 2;

    return (
      <Group>
        <Circle
          radius={radius}
          x={x}
          y={y}
          fill={fill}
          onClick={this.onClick}
        />
        <Circle
          radius={radius - halfStrokeWidth}
          x={x}
          y={y}
          stroke={`rgba(0,0,0,0.15)`}
          strokeWidth={strokeWidth}
          onClick={this.onClick}
        />
      </Group>
    );
  }
}

export default Token;
