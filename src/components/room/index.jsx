import React from 'react';
import { Rect } from 'react-konva';
import { shape, objectOf, arrayOf, number, bool } from 'prop-types';

import randomRgb from '../../utils/random-rgb';

const Room = ({ tiles, w, h }) => {
  const color = randomRgb();
  const tileSize = 10;

  console.log(tiles.length);

  return (
    <Rect
      x={w / 2}
      y={h / 2}
      width={tileSize}
      height={tileSize}
      fill={color}
      strokeEnabled={false}
    />
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
