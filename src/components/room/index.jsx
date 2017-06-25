import React from 'react';
import { Group } from 'react-konva';
import {
  shape,
  objectOf,
  arrayOf,
  func,
  number,
  bool,
  string,
} from 'prop-types';

import Tile from 'components/tile';

const Room = ({
  floorColor,
  tiles,
  id,
  transformPoint,
  tileSize,
  addRooms,
}) => {
  const drawnTiles = tiles.map(tile => {
    const center = transformPoint(tile);

    return (
      <Tile
        key={`${tile.x},${tile.y}`}
        x={center.x}
        y={center.y}
        width={tileSize}
        height={tileSize}
        floorColor={floorColor}
        walls={tile.walls}
        doors={tile.doors}
        roomId={id}
        addRooms={addRooms}
        coords={{ x: tile.x, y: tile.y }}
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
  floorColor: string.isRequired,
  tiles: arrayOf(tileShape).isRequired,
  id: string.isRequired,
  transformPoint: func.isRequired,
  tileSize: number.isRequired,
  addRooms: func.isRequired,
};

export default Room;
