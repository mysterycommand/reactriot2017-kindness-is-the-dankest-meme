import React from 'react';
import { Rect, Group, Path } from 'react-konva';
import { objectOf, number, string, bool } from 'prop-types';

const directions = ['top', 'right', 'bottom', 'left'];
const wallPoints = (x, y, width, height, direction) => {
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
};

const doorPoints = (x, y, width, height, direction) => {
  const dw = width / 4;
  const dy = height / 4;

  switch (direction) {
    case 'top':
      return [{ x: x + dw }, { x: x + width - dw, y }];
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
};

const Tile = ({ x, y, width, height, floorColor, walls, doors, roomId }) => {
  const drawnWalls = [];
  const drawnDoors = [];

  const topLeft = { x: x - width / 2, y: y - height / 2 };

  directions.forEach(direction => {
    if (walls[direction]) {
      const points = wallPoints(topLeft.x, topLeft.y, width, height, direction);

      drawnWalls.push(
        <Path
          key={`${roomId}-wall-${direction}`}
          data={[
            `M ${points[0].x} ${points[0].y}`,
            `L ${points[1].x} ${points[1].y}`,
            'Z',
          ].join(' ')}
          fillEnabled={false}
          stroke={'#444444'}
          strokeWidth={2}
        />,
      );
    }

    if (doors[direction]) {
      const points = doorPoints(topLeft.x, topLeft.y, width, height, direction);

      drawnDoors.push(
        <Path
          key={`${roomId}-door-${direction}`}
          data={[
            `M ${points[0].x} ${points[0].y}`,
            `L ${points[1].x} ${points[1].y}`,
            'Z',
          ].join(' ')}
          fillEnabled={false}
          stroke={'#efefef'}
          strokeWidth={2}
        />,
      );
    }
  });

  return (
    <Group>
      <Rect
        x={topLeft.x}
        y={topLeft.y}
        width={width}
        height={height}
        fill={floorColor}
        strokeEnabled
        strokeWidth={1}
        stroke={floorColor}
      />

      {drawnWalls}
      {drawnDoors}
    </Group>
  );
};

Tile.propTypes = {
  x: number.isRequired,
  y: number.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  floorColor: string,
  walls: objectOf(bool),
  doors: objectOf(bool),
  roomId: string.isRequired,
};

Tile.defaultProps = {
  floorColor: '#cccccc',
  walls: {},
  doors: {},
};

export default Tile;
