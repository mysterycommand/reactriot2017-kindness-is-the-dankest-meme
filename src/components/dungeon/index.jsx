import React from 'react';
import { Group } from 'react-konva';
import { shape, objectOf, arrayOf, number, string, bool } from 'prop-types';

import Room from 'components/room';

const Dungeon = ({ dungeon, width, height, zoomLevel, centerOffset }) => {
  const rooms = Object.keys(dungeon.rooms).map(roomId => {
    const room = dungeon.rooms[roomId];
    return (
      <Room
        key={room.id}
        floorColor={room.floorColor}
        tiles={room.tiles}
        w={width}
        h={height}
        id={room.id}
        zoomLevel={zoomLevel}
        centerOffset={centerOffset}
      />
    );
  });

  return (
    <Group>
      {rooms}
    </Group>
  );
};

const tileShape = shape({
  x: number,
  y: number,
  walls: objectOf(bool),
  doors: objectOf(bool),
});

Dungeon.propTypes = {
  width: number.isRequired,
  height: number.isRequired,
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
  zoomLevel: number.isRequired,
};

export default Dungeon;
