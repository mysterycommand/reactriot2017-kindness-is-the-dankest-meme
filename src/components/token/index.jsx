import React, { Component } from 'react';
import { Group } from 'react-konva';
import { number } from 'prop-types';

import Coin from 'components/coin';
import Crown from 'components/crown';

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

    const pathWidth = radius * 1.1;
    const pathHeight = pathWidth * 2 / 3;

    return (
      <Group onClick={this.onClick}>
        <Coin
          {...{
            x,
            y,
            radius,
            fill,
          }}
        />
        <Crown
          {...{
            x,
            y,
            width: pathWidth,
            height: pathHeight,
            fill: 'rgba(0,0,0,0.15)',
          }}
        />
      </Group>
    );
  }
}

export default Token;
