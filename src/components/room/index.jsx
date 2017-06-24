import React from 'react';
import { Group } from 'react-konva';
import { shape, objectOf, arrayOf, number, bool, string } from 'prop-types';

import Tile from 'components/tile';

const BASE_TILE_SIZE = 40;

const Room = ({ floorColor, tiles, w, h, id, zoomLevel }) => {
  const tileSize = BASE_TILE_SIZE * zoomLevel;
  const realCenter = { x: w / 2, y: h / 2 };

  const mapCenter = (x, y) => {
    const scaled = { x: x * tileSize, y: y * tileSize };

    // 0, 0 was center before
    const shifted = { x: scaled.x + realCenter.x, y: scaled.y + realCenter.y };

    return shifted;
  };

  const drawnTiles = tiles.map(tile => {
    const center = mapCenter(tile.x, tile.y);

    return (
      <Tile
        key={`${tile.x},${tile.y}`}
        x={center.x - tileSize / 2}
        y={center.y - tileSize / 2}
        width={tileSize}
        height={tileSize}
        floorColor={floorColor}
        walls={tile.walls}
        doors={tile.doors}
        roomId={id}
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
  w: number.isRequired,
  h: number.isRequired,
  id: string.isRequired,
  zoomLevel: number,
};

Room.defaultProps = {
  zoomLevel: 1,
};

export default Room;
