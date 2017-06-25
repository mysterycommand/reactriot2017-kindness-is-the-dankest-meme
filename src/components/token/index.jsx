import React, { Component } from 'react';
import { Group, Star, Text } from 'react-konva';
import { number, string } from 'prop-types';

import Coin from 'components/coin';
import Crown from 'components/crown';

class Token extends Component {
  static propTypes = {
    x: number,
    y: number,
    radius: number,
    face: string,
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
    const fill = 'rgba(0,0,0,0.15)';

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
              fill,
            }}
          />
        );
      case 'crown':
        return (
          <Crown
            {...{
              x,
              y,
              width: radius,
              height: radius * 2 / 3,
              fill,
            }}
          />
        );
      default:
        return (
          <Text
            {...{
              x: x - radius,
              y: y - radius * 4 / 5,
              width: radius * 2,
              height: radius * 2,
              text: face,
              fontFamily: 'arial',
              fontSize: radius * 3 / 2,
              align: 'center',
              fill,
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
