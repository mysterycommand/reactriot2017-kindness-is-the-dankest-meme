import React from 'react';
import { Path } from 'react-konva';
import { number, oneOf } from 'prop-types';

export function getPoints({ x, y, width, height, direction }) {
  const dw = width / 4;
  const dy = height / 4;

  switch (direction) {
    case 'top':
      return [{ x: x + dw, y }, { x: x + width - dw, y }];
    case 'right':
      return [
        { x: x + width, y: y + dy },
        { x: x + width, y: y + height - dy },
      ];
    case 'bottom':
      return [
        { x: x + dw, y: y + height },
        { x: x + width - dw, y: y + height },
      ];
    case 'left':
      return [{ x, y: y + dy }, { x, y: y + height - dy }];
    default:
      throw new Error('ahhHHHhHHHh');
  }
}

const Door = ({ x, y, width, height, direction }) => {
  const points = getPoints({ x, y, width, height, direction });

  return (
    <Path
      data={[
        `M ${points[0].x} ${points[0].y}`,
        `L ${points[1].x} ${points[1].y}`,
        'Z',
      ].join(' ')}
      fillEnabled={false}
      stroke={'#efefef'}
      strokeWidth={2}
    />
  );
};

Door.propTypes = {
  x: number.isRequired,
  y: number.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  direction: oneOf(['top', 'right', 'bottom', 'left']).isRequired,
};

export default Door;
