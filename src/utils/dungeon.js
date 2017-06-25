import randomRgb from './random-rgb';

const MIN_TILES_PER_ROOM = 24;
const MAX_TILES_PER_ROOM = 58;
const DOORS_PER_ROOM = 4;

export const DIRECTIONS = ['top', 'right', 'bottom', 'left'];

export const tileKey = tile => `${tile.x},${tile.y}`;

function hasWall(tile) {
  return (
    tile.walls.left || tile.walls.top || tile.walls.right || tile.walls.bottom
  );
}

function canHaveDoor(tile) {
  return (
    ['top', 'right', 'bottom', 'left'].filter(
      dir => tile.walls[dir] && !tile.doors[dir],
    ).length > 0
  );
}

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

export function addRoom(dungeon, starting) {
  const roomCount = Object.keys(dungeon.rooms).length;

  const room = {
    id: String(roomCount),
    doorTiles: [],
    floorColor: randomRgb(),
  };

  const tilesInRoom = {};

  const tiles = [];

  const startingTile = {};

  if (starting) {
    Object.assign(startingTile, starting);
  } else {
    Object.assign(startingTile, {
      walls: {
        left: true,
        top: true,
        right: true,
        bottom: true,
      },
      doors: {},
    });

    if (roomCount === 0) {
      Object.assign(startingTile, {
        x: 0,
        y: 0,
      });
    } else {
      const availableTiles = Object.keys(dungeon.rooms)
        .filter(r => dungeon.rooms[r].doorTiles.length > 0)
        .map(r =>
          dungeon.rooms[r].doorTiles.filter(
            tile =>
              Object.keys(tile.doors).filter(dir => {
                const dirCoords = tileInDirection(tile.x, tile.y, dir);

                return (
                  tile.doors[dir] === true &&
                  !dungeon.tileToRoom[`${dirCoords.x},${dirCoords.y}`]
                );
              }).length > 0,
          ),
        )
        .reduce((acc, val) => (val ? acc.concat(val) : val), []);

      if (availableTiles.length === 0) {
        console.warn("Couldn't add new room.");
        return null;
      }

      const sourceTile = arrayRand(availableTiles);
      const startingDirs = Object.keys(sourceTile.doors).filter(dir => {
        const checking = tileInDirection(sourceTile.x, sourceTile.y, dir);
        return (
          sourceTile.doors[dir] === true &&
          !dungeon.tileToRoom[`${checking.x},${checking.y}`]
        );
      });
      const startingDir = arrayRand(startingDirs);
      const coords = tileInDirection(sourceTile.x, sourceTile.y, startingDir);

      Object.assign(startingTile, {
        x: coords.x,
        y: coords.y,
      });

      const inv = inverseDir(startingDir);

      Object.assign(startingTile.doors, {
        [inv]: true,
      });

      Object.assign(startingTile.walls, {
        [inv]: true,
      });
    }
  }

  tiles.push(startingTile);

  tilesInRoom[`${startingTile.x},${startingTile.y}`] = startingTile;

  const tileCount =
    Math.floor(Math.random() * (MAX_TILES_PER_ROOM - MIN_TILES_PER_ROOM)) +
    MIN_TILES_PER_ROOM;

  while (tiles.length < tileCount) {
    // pick a random tile that's on the wall
    const possibleTiles = tiles.filter(
      tile =>
        ['top', 'right', 'bottom', 'left'].filter(dir => {
          const checking = tileInDirection(tile.x, tile.y, dir);
          const key = `${checking.x},${checking.y}`;
          return (
            tile.walls[dir] && !dungeon.tileToRoom[key] && !tilesInRoom[key]
          );
        }).length > 0,
    );

    if (possibleTiles.length === 0) {
      console.warn('what happened here');
      break;
    }

    const sourceTile = arrayRand(possibleTiles);

    const possibleDirections = Object.keys(
      sourceTile.walls,
    ).filter(direction => {
      const coords = tileInDirection(sourceTile.x, sourceTile.y, direction);
      const coordsKey = `${coords.x},${coords.y}`;
      return (
        sourceTile.walls[direction] &&
        !dungeon.tileToRoom[coordsKey] &&
        !tilesInRoom[coordsKey]
      );
    });

    if (possibleDirections.length === 0) {
      // room has expanded to as large as it could. that's fine.
      break;
    }

    const direction = arrayRand(possibleDirections);

    sourceTile.walls[direction] = false;

    const newTile = tileInDirection(sourceTile.x, sourceTile.y, direction);
    newTile.walls = {};
    newTile.doors = {};

    ['left', 'top', 'right', 'bottom'].forEach(dir => {
      const checking = tileInDirection(newTile.x, newTile.y, dir);
      newTile.walls[dir] = !tilesInRoom[`${checking.x},${checking.y}`];
    });

    tilesInRoom[`${newTile.x},${newTile.y}`] = newTile;
    tiles.push(newTile);
  }

  // we have to do this again to catch any staggling mis-marked walls
  tiles.forEach(tile => {
    DIRECTIONS.forEach(dir => {
      const checking = tileInDirection(tile.x, tile.y, dir);
      const roomNeighbor = tilesInRoom[tileKey(checking)];
      const otherNeighbor = dungeon.tileToRoom[tileKey(checking)];
      Object.assign(tile.walls, {
        [dir]: !roomNeighbor,
      });

      if (otherNeighbor) {
        const neighborRoom = dungeon.rooms[otherNeighbor];
        const neighborDoors = neighborRoom.doorTiles.filter(
          n => tileKey(n) === tileKey(checking),
        );

        if (neighborDoors.length === 0) {
          return;
        }

        const neighborDoor = neighborDoors[0];

        if (neighborDoor.doors[inverseDir(dir)]) {
          Object.assign(tile.doors, {
            [dir]: true,
          });
        }
      }
    });
  });

  const doorsNeeded = DOORS_PER_ROOM - room.doorTiles.length;

  for (let i = 0; i < doorsNeeded; i += 1) {
    const possibleTiles = tiles.filter(hasWall).filter(canHaveDoor);

    if (possibleTiles.length === 0) {
      break;
    }

    const tile = arrayRand(possibleTiles);

    const availableDirs = ['left', 'top', 'right', 'bottom'].filter(
      dir => tile.walls[dir] && !tile.doors[dir],
    );
    const dir = arrayRand(availableDirs);

    tile.doors[dir] = true;
    room.doorTiles.push(tile);
  }

  room.tiles = tiles;

  return room;
}

export function generateDungeon(initialRooms = 1) {
  const dungeon = {
    rooms: {},
    tileToRoom: {},
  };

  for (let i = 0; i < initialRooms; i += 1) {
    const newRoom = addRoom(dungeon);

    if (newRoom) {
      dungeon.rooms[newRoom.id] = newRoom;
      newRoom.tiles.forEach(
        tile => (dungeon.tileToRoom[`${tile.x},${tile.y}`] = newRoom.id),
      );
    }
  }

  return dungeon;
}
