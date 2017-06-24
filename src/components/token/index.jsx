import React, { Component } from 'react';
import { Circle, Group, Path } from 'react-konva';
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

    const strokeWidth = radius / 6;
    const halfStrokeWidth = strokeWidth / 2;

    const pathWidth = radius * 1.1;
    const pathHeight = pathWidth * 2 / 3;

    return (
      <Group onClick={this.onClick}>
        <Circle radius={radius} x={x} y={y} fill={fill} />
        <Circle
          radius={radius - halfStrokeWidth}
          x={x}
          y={y}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth={strokeWidth}
        />
        <Path
          data={[
            `M ${x - pathWidth / 2} ${y - pathHeight / 2}`,
            `L ${x - pathWidth / 4.5} ${y}`,
            `L ${x} ${y - pathHeight / 1.5}`,
            `L ${x + pathWidth / 4.5} ${y}`,
            `L ${x + pathWidth / 2} ${y - pathHeight / 2}`,
            `L ${x + pathWidth / 2} ${y + pathHeight / 2}`,
            `L ${x - pathWidth / 2} ${y + pathHeight / 2}`,
            'Z',
          ].join()}
          fill="rgba(0,0,0,0.15)"
        />
      </Group>
    );
  }
}

export default Token;
