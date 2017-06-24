import React, { Component } from 'react';
import { Group, Star } from 'react-konva';
import { number, oneOf, string } from 'prop-types';

import Coin from 'components/coin';
import Crown from 'components/crown';

class Token extends Component {
  static propTypes = {
    x: number,
    y: number,
    radius: number,
    face: oneOf(['crown', 'star']),
    fill: string,
  };

  static defaultProps = {
    x: 0,
    y: 0,
    radius: 10,
    face: 'crown',
    fill: 'rgba(255,255,255,1)',
  };

  getFace() {
    const { x, y, radius, face } = this.props;

    switch (face) {
      case 'star':
        return (
          <Star
            {...{
              x,
              y,
              numPoints: 5,
              innerRadius: radius * 1 / 3,
              outerRadius: radius * 3 / 5,
              fill: 'rgba(0,0,0,0.15)',
            }}
          />
        );
      case 'crown':
      default:
        return (
          <Crown
            {...{
              x,
              y,
              width: radius,
              height: radius * 2 / 3,
              fill: 'rgba(0,0,0,0.15)',
            }}
          />
        );
    }
  }

  render() {
    const { x, y, radius, fill } = this.props;

    return (
      <Group>
        <Coin
          {...{
            x,
            y,
            radius,
            fill,
          }}
        />
        {this.getFace()}
      </Group>
    );
  }
}

export default Token;
