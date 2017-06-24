import React from 'react';
import { Stage, Layer } from 'react-konva';
import { number, shape, string, bool, objectOf, arrayOf } from 'prop-types';

import Dungeon from 'components/dungeon';

import style from './style.scss';

// <Token x={halfWidth - 60} y={halfHeight} radius={48} face="star" />
// <Token x={halfWidth + 60} y={halfHeight} radius={48} />

const Viewport = ({ width, height, dungeon, zoomLevel }) =>
  <Stage className={style.viewport} width={width} height={height}>
    <Layer>

      <Dungeon
        width={width}
        height={height}
        dungeon={dungeon}
        zoomLevel={zoomLevel}
      />
    </Layer>
  </Stage>;

const tileShape = shape({
  x: number,
  y: number,
  walls: objectOf(bool),
  doors: objectOf(bool),
});

Viewport.propTypes = {
  width: number.isRequired,
  height: number.isRequired,
  zoomLevel: number.isRequired,
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
