import randomRgb from './random-rgb';

const MIN_TILES_PER_ROOM = 24;
const MAX_TILES_PER_ROOM = 58;
// const DOORS_PER_ROOM = 4;

export const DIRECTIONS = ['top', 'right', 'bottom', 'left'];
export const getTileId = tile => `${tile.x},${tile.y}`;

const baseWalls = () =>
  DIRECTIONS.reduce((acc, val) => Object.assign(acc, { [val]: true }), {});

function inverseDir(direction) {
  switch (direction) {
    case 'left':
      return 'right';
    case 'top':
      return 'bottom';
    case 'right':
      return 'left';
    case 'bottom':
      return 'top';
    default:
      throw new Error(`Invalid direction "${direction}" given to inverseDir`);
  }
}

export function tileInDirection(x, y, direction) {
  switch (direction) {
    case 'left':
      return { x: x - 1, y };
    case 'top':
      return { x, y: y - 1 };
    case 'right':
      return { x: x + 1, y };
    case 'bottom':
      return { x, y: y + 1 };
    default:
      throw new Error(
        `Invalid direction "${direction}" given to tileInDirection`,
      );
  }
}

function arrayRand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const getUnfinishedDoors = (tile, dungeon) =>
  Object.keys(tile.doors).filter(direction => {
    if (!tile.doors[direction]) {
      return false;
    }

    const otherSideId = getTileId(tileInDirection(tile.x, tile.y, direction));
    return !dungeon.tiles[otherSideId];
  });

const getTilesWithUnfinishedDoors = dungeon =>
  Object.keys(dungeon.tiles).filter(tileId => {
    const tile = dungeon.tiles[tileId];
    const unfinishedDoors = getUnfinishedDoors(tile, dungeon);
    return unfinishedDoors.length > 0;
  });

export function addRoom(originalDungeon, starting) {
  const dungeon = Object.assign({}, originalDungeon);
  const roomCount = Object.keys(dungeon.rooms).length;

  const room = {
    id: String(roomCount),
    tileIds: [],
    doorTileIds: [],
    floorColor: randomRgb,
  };
  const roomTiles = {};

  const addTileToRoom = tile => {
    Object.assign(tile, { roomId: room.id });
    roomTiles[tile.id] = tile;
    room.tileIds.push(tile.id);
  };

  const startingTile = {};

  if (starting) {
    Object.assign(startingTile, starting);
  } else if (roomCount === 0) {
    Object.assign(startingTile, {
      x: 0,
      y: 0,
    });
  } else {
    const availableTiles = getTilesWithUnfinishedDoors(dungeon);
    if (availableTiles.length === 0) {
      console.warn("Couldn't add new room.");
      return null;
    }

    const sourceDoorTile = arrayRand(availableTiles);
    const sourceDirection = arrayRand(
      getUnfinishedDoors(sourceDoorTile, dungeon),
    );
    const startingTileCoords = tileInDirection(
      sourceDoorTile.x,
      sourceDoorTile.y,
      sourceDirection,
    );
    Object.assign(startingTile, startingTileCoords);
  }

  if (!startingTile.walls) {
    startingTile.walls = baseWalls();
  }

  if (!startingTile.doors) {
    startingTile.doors = {};
  }

  if (!startingTile.id) {
    startingTile.id = getTileId(startingTile);
  }

  addTileToRoom(startingTile);

  const tileCount =
    Math.floor(Math.random() * (MAX_TILES_PER_ROOM - MIN_TILES_PER_ROOM)) +
    MIN_TILES_PER_ROOM;

  while (room.tileIds.length < tileCount) {
    // add a tile to a room. First, pick a tile in this room on a wall,
    // that also doesn't have anything next to it

    const possibleNewTileLocations = room.tileIds
      .map(tileId => {
        const tile = roomTiles[tileId];

        const openDirections = DIRECTIONS.filter(dir => {
          const checking = getTileId(tileInDirection(tile.x, tile.y, dir));
          return !(dungeon.tiles[checking] || roomTiles[checking]);
        }).reduce((a, v) => a.concat(v), []);

        return openDirections.map(dir => tileInDirection(tile.x, tile.y, dir));
      })
      .reduce((acc, val) => acc.concat(val), []);

    if (possibleNewTileLocations.length === 0) {
      // The room is as big as it's going to get. That's fine.
      break;
    }

    const newTile = arrayRand(possibleNewTileLocations);
    Object.assign(newTile, {
      id: getTileId(newTile),
      walls: baseWalls(),
      doors: {},
    });

    addTileToRoom(newTile);
  }

  dungeon.rooms[room.id] = room;

  room.tileIds.forEach(tileId => {
    const tile = roomTiles[tileId];
    dungeon.tiles[tileId] = tile;
  });
  room.tileIds.forEach(tileId => {
    const tile = roomTiles[tileId];

    // Now check if the new tiles need walls or doors
    DIRECTIONS.forEach(direction => {
      const neighborId = getTileId(tileInDirection(tile.x, tile.y, direction));
      const neighbor = dungeon.tiles[neighborId];

      if (!neighbor) {
        tile.walls[direction] = true;
        return;
      }

      if (neighbor.roomId === room.id) {
        tile.walls[direction] = false;
        tile.doors[direction] = false;
        return;
      }

      // here, we have a neighbor in another room
      tile.walls[direction] = true;
      tile.doors[direction] = neighbor.doors[inverseDir(direction)];
    });
  });

  return dungeon;
}

export function generateDungeon(initialRooms = 1) {
  let dungeon = {
    rooms: {},
    tiles: {},
  };

  for (let i = 0; i < initialRooms; i += 1) {
    dungeon = addRoom(dungeon);
  }

  return dungeon;
}
