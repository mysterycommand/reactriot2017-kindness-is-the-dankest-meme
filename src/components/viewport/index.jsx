import React from 'react';
import { Stage, Layer } from 'react-konva';
import {
  number,
  shape,
  func,
  string,
  bool,
  objectOf,
  arrayOf,
} from 'prop-types';

import Dungeon from 'components/dungeon';

import style from './style.scss';

// <Token x={halfWidth - 60} y={halfHeight} radius={48} face="star" />
// <Token x={halfWidth + 60} y={halfHeight} radius={48} />

const Viewport = ({
  width,
  height,
  dungeon,
  zoomLevel,
  centerOffset,
  onClick,
}) =>
  <Stage
    className={style.viewport}
    width={width}
    height={height}
    onClick={onClick}
  >
    <Layer>

      <Dungeon
        width={width}
        height={height}
        dungeon={dungeon}
        zoomLevel={zoomLevel}
        centerOffset={centerOffset}
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
  onClick: func.isRequired,
  centerOffset: shape({ x: number, y: number }).isRequired,
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
