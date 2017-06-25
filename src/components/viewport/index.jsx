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

const Viewport = ({ width, height, dungeon, zoomLevel, players, addRooms }) =>
  <Stage className={style.viewport} width={width} height={height}>
    <Layer draggable>
      <Dungeon
        width={width}
        height={height}
        dungeon={dungeon}
        zoomLevel={zoomLevel}
        players={players}
        addRooms={addRooms}
      />
    </Layer>
  </Stage>;

const tileShape = shape({
  x: number,
  y: number,
  walls: objectOf(bool),
  doors: objectOf(bool),
});

const playerShape = shape({
  x: number,
  y: number,
  fill: string,
  face: string,
  id: string,
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
  players: arrayOf(playerShape).isRequired,
  addRooms: func.isRequired,
};

export default Viewport;
