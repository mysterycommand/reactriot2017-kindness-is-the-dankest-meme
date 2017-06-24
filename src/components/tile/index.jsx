import React from 'react';
import { Rect, Group, Path } from 'react-konva';
import { objectOf, number, string, bool } from 'prop-types';

const directions = ['top', 'right', 'bottom', 'left'];
const sidePoints = (x, y, width, height, direction) => {
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

const Tile = ({ x, y, width, height, floorColor, walls, doors }) => {
  // const drawnWalls = Object.keys(walls).map(() => null);
  const drawnDoors = Object.keys(doors).map(() => null);

  const drawnWalls = [];
  // let drawnDoors = [];

  directions.forEach(direction => {
    console.log(walls);
    if (walls[direction]) {
      const points = sidePoints(x, y, width, height, direction);

      drawnWalls.push(
        <Path
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
  });

  return (
    <Group>
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={floorColor}
        strokeEnabled={false}
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
};

Tile.defaultProps = {
  floorColor: '#cccccc',
  walls: {},
  doors: {},
};

export default Tile;
