import React from 'react';
import { Rect, Group, Path, Text } from 'react-konva';
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

const Tile = ({ x, y, width, height, floorColor, walls, doors, roomId }) => {
  const drawnWalls = [];
  const drawnDoors = [];

  directions.forEach(direction => {
    if (walls[direction]) {
      const points = wallPoints(x, y, width, height, direction);

      drawnWalls.push(
        <Path
          key={`wall-${direction}`}
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
      const points = wallPoints(x, y, width, height, direction);

      drawnDoors.push(
        <Path
          key={`wall-${direction}`}
          data={[
            `M ${points[0].x} ${points[0].y}`,
            `L ${points[1].x} ${points[1].y}`,
            'Z',
          ].join(' ')}
          fillEnabled={false}
          stroke={'#efefef'}
          strokeWidth={3}
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
        strokeEnabled
        strokeWidth={1}
        stroke={floorColor}
      />

      {drawnWalls}
      {drawnDoors}

      <Text
        text={roomId}
        x={x + width / 2 - 4}
        y={y + height / 2 - 5}
        fill={'#fefefe'}
        strokeEnabled={false}
      />
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
