import React from 'react';
import { Group } from 'react-konva';
import { shape, objectOf, arrayOf, number, string, bool } from 'prop-types';

import Room from 'components/room';

const Dungeon = ({ dungeon, width, height }) => {
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

export default Dungeon;
