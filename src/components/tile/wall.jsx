import React from 'react';
import { Group, Path } from 'react-konva';
import { number, oneOf } from 'prop-types';

export function getPoints({ x, y, width, height, direction }) {
  const t = 5;
  const u = 1;

  switch (direction) {
    case 'top':
      return [
        { x, y },
        { x: x + width, y },
        { x: x + width - u, y: y + t },
        { x: x + u, y: y + t },
      ];
    case 'right':
      return [
        { x: x + width, y },
        { x: x + width, y: y + height },
        { x: x + width - t, y: y + height - u },
        { x: x + width - t, y: y + u },
      ];
    case 'bottom':
      return [
        { x, y: y + height },
        { x: x + width, y: y + height },
        { x: x + width - u, y: y + height - t },
        { x: x + u, y: y + height - t },
      ];
    case 'left':
      return [
        { x, y },
        { x, y: y + height },
        { x: x + t, y: y + height - u },
        { x: x + t, y: y + u },
      ];
    default:
      throw new Error('ahhHHHhHHHh');
  }
}

export function getFill({ direction }) {
  switch (direction) {
    case 'top':
      return '#837a59';
    case 'right':
      return '#6d664b';
    case 'bottom':
      return '#696248';
    case 'left':
      return '#525246';
    default:
      return 'red';
  }
}

const Wall = props => {
  const points = getPoints(props);
  const fill = getFill(props);

  return (
    <Group>
      <Path
        data={[
          `M ${points[0].x} ${points[0].y}`,
          `L ${points[1].x} ${points[1].y}`,
          `L ${points[2].x} ${points[2].y}`,
          `L ${points[3].x} ${points[3].y}`,
          'Z',
        ].join(' ')}
        fill={fill}
      />
      <Path
        data={[
          `M ${points[0].x} ${points[0].y}`,
          `L ${points[1].x} ${points[1].y}`,
          'Z',
        ].join(' ')}
        stroke="#3c4a5f"
        strokeWidth="1"
      />
    </Group>
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
