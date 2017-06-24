import React from 'react';
import { Rect, Group } from 'react-konva';
import { shape, objectOf, arrayOf, number, bool } from 'prop-types';

import randomRgb from '../../utils/random-rgb';

const Room = ({ tiles, w, h }) => {
  const color = randomRgb();

  const tileSize = 10;
  const realCenter = { x: w / 2, y: h / 2 };

  const mapCenter = (x, y) => {
    const scaled = { x: x * tileSize, y: y * tileSize };

    // 0, 0 was center before
    const shifted = { x: scaled.x + realCenter.x, y: scaled.y + realCenter.y };

    return shifted;
  };

  const drawnTiles = tiles.map(tile => {
    const center = mapCenter(tile.x, tile.y);

    return (
      <Rect
        key={`${tile.x},${tile.y}`}
        x={center.x - tileSize / 2}
        y={center.y - tileSize / 2}
        width={tileSize}
        height={tileSize}
        fill={color}
        strokeEnabled={false}
      />
    );
  });

  return (
    <Group>
      {drawnTiles}
    </Group>
  );
};

const tileShape = shape({
  x: number,
  y: number,
  walls: objectOf(bool),
  doors: objectOf(bool),
});

Room.propTypes = {
  tiles: arrayOf(tileShape).isRequired,
  w: number.isRequired,
  h: number.isRequired,
};

export default Room;
