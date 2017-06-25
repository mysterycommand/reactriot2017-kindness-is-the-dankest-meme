import React, { Component } from 'react';
import { Group, Star } from 'react-konva';
import { number, string, bool } from 'prop-types';

import Coin from './coin';
import Crown from './faces/crown';
import TextFace from './faces/text-face';

class Token extends Component {
  static propTypes = {
    x: number,
    y: number,
    radius: number,
    face: string,
    fill: string,
    highlight: bool,
  };

  static defaultProps = {
    x: 0,
    y: 0,
    radius: 12,
    face: 'crown',
    fill: 'rgba(255,255,255,1)',
    highlight: false,
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
          <TextFace
            {...{
              x,
              y,
              fontSize: radius * 3 / 2,
              text: face,
              fill,
            }}
          />
        );
    }
  }

  getHighlight() {
    const { x, y, radius, highlight } = this.props;
    return highlight
      ? <Coin {...{ x, y, radius, fill: 'rgba(0,0,0,0.5)' }} />
      : null;
  }

  render() {
    const { x, y, radius, fill } = this.props;

    return (
      <Group>
        {this.getHighlight()}
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
