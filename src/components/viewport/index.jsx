import React from 'react';
import { Stage, Layer } from 'react-konva';
import { number, shape, string, bool, objectOf, arrayOf } from 'prop-types';

import Dungeon from 'components/dungeon';
import Token from 'components/token';

import style from './style.scss';

const Viewport = ({ width, height, dungeon }) => {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return (
    <Stage className={style.viewport} width={width} height={height}>
      <Layer>
        <Token x={halfWidth - 60} y={halfHeight} radius={48} face="star" />
        <Token x={halfWidth + 60} y={halfHeight} radius={48} />
        <Dungeon width={width} height={height} dungeon={dungeon} />
      </Layer>
    </Stage>
  );
};

const tileShape = shape({
  x: number,
  y: number,
  walls: objectOf(bool),
  doors: objectOf(bool),
});

Viewport.propTypes = {
  width: number.isRequired,
  height: number.isRequired,
  dungeon: shape({
    rooms: objectOf(
      shape({
        id: string,
        doorTiles: arrayOf(tileShape),
      }),
    ),
    tileToRoom: objectOf(string),
  }).isRequired,
};

export default Viewport;
