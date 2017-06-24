import React from 'react';
import { Stage, Layer } from 'react-konva';
import { shape, objectOf, arrayOf, number, bool } from 'prop-types';

import Room from 'components/room';

const Dungeon = ({ dungeon }) => {
  const w = 400;
  const h = 400;

  const rooms = Object.keys(dungeon.rooms).map(roomId => {
    const room = dungeon.rooms[roomId];
    return (
      <Room
        key={room.id}
        floorColor={room.floorColor}
        tiles={room.tiles}
        w={w}
        h={h}
      />
    );
  });

  return (
    <Stage className="dungeon" width={w} height={h}>
      <Layer>
        {rooms}
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

Dungeon.propTypes = {
  dungeon: shape({
    rooms: objectOf(
      shape({
        id: number,
        doorTiles: arrayOf(tileShape),
      }),
    ),
    tileToRoom: objectOf(number),
  }).isRequired,
};

export default Dungeon;
