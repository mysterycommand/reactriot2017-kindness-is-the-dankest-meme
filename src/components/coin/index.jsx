import React from 'react';
import { Group, Circle } from 'react-konva';
import { number, string } from 'prop-types';

const Coin = ({ x, y, radius, fill }) => {
  const strokeWidth = radius / 6;
  const halfStrokeWidth = strokeWidth / 2;

  return (
    <Group>
      <Circle {...{ x, y, radius, fill }} />
      <Circle
        {...{
          x,
          y,
          radius: radius - halfStrokeWidth,
          stroke: 'rgba(0,0,0,0.15)',
          strokeWidth,
        }}
      />
    </Group>
  );
};

Coin.propTypes = {
  x: number.isRequired,
  y: number.isRequired,
  radius: number.isRequired,
  fill: string,
};

Coin.defaultProps = {
  fill: 'black',
};

export default Coin;
