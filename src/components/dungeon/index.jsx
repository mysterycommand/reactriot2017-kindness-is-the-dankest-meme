import React from 'react';
import { Group } from 'react-konva';
import {
  shape,
  func,
  objectOf,
  arrayOf,
  number,
  string,
  bool,
} from 'prop-types';

import Room from 'components/room';
import Token from 'components/token';

const BASE_TILE_SIZE = 20;

const Dungeon = ({ dungeon, width, height, zoomLevel, players, addRooms }) => {
  const tileSize = BASE_TILE_SIZE * zoomLevel;
  const realCenter = { x: width / 2, y: height / 2 };

  const transformPoint = point => {
    const scaled = { x: point.x * tileSize, y: point.y * tileSize };
    const shifted = {
      x: scaled.x + realCenter.x,
      y: scaled.y + realCenter.y,
    };

    return shifted;
  };

  const rooms = Object.keys(dungeon.rooms).map(roomId => {
    const room = dungeon.rooms[roomId];
    return (
      <Room
        key={room.id}
        floorColor={room.floorColor}
        tiles={room.tiles}
        tileSize={tileSize}
        id={room.id}
        zoomLevel={zoomLevel}
        transformPoint={transformPoint}
        addRooms={addRooms}
      />
    );
  });

  const drawnPlayers = players.map(player =>
    <Token
      key={player.id}
      x={transformPoint(player).x}
      y={transformPoint(player).y}
      radius={tileSize / 3}
      face={player.face}
      fill={player.fill}
    />,
  );

  return (
    <Group>
      {rooms}

      <Group>
        {drawnPlayers}
      </Group>
    </Group>
  );
};

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

Dungeon.propTypes = {
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
  zoomLevel: number.isRequired,
  players: arrayOf(playerShape).isRequired,
  addRooms: func.isRequired,
};

export default Dungeon;
