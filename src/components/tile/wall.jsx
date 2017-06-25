import React from 'react';
import { Path } from 'react-konva';
import { number, oneOf } from 'prop-types';

export function getPoints({ x, y, width, height, direction }) {
  switch (direction) {
    case 'top':
      return [{ x, y }, { x: x + width, y }];
    case 'right':
      return [{ x: x + width, y }, { x: x + width, y: y + height }];
    case 'bottom':
      return [{ x, y: y + height }, { x: x + width, y: y + height }];
    case 'left':
      return [{ x, y }, { x, y: y + height }];
    default:
      throw new Error('ahhHHHhHHHh');
  }
}

const Wall = ({ x, y, width, height, direction }) => {
  const points = getPoints({ x, y, width, height, direction });

  return (
    <Path
      data={[
        `M ${points[0].x} ${points[0].y}`,
        `L ${points[1].x} ${points[1].y}`,
        'Z',
      ].join(' ')}
      fillEnabled={false}
      stroke={'#444444'}
      strokeWidth={2}
    />
  );
};

Wall.propTypes = {
  x: number.isRequired,
  y: number.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  direction: oneOf(['top', 'right', 'bottom', 'left']).isRequired,
};

export default Wall;
