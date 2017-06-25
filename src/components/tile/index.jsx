import React, { Component } from 'react';
import { Rect, Group } from 'react-konva';
import { objectOf, number, string, bool, func } from 'prop-types';

import Wall from './wall';
import Door from './door';
import { DIRECTIONS } from '../../utils/dungeon';

class Tile extends Component {
  state = {
    fill: `rgb(${150 + Math.floor(Math.random() * 20)},${135 +
      Math.floor(Math.random() * 20)},${100 + Math.floor(Math.random() * 20)})`,
  };

  onClick = () => {
    this.props.addRooms({
      x: this.props.coords.x,
      y: this.props.coords.y,
      doors: this.props.doors,
    });
  };

  render() {
    const { x, y, width, height, walls, doors, roomId } = this.props;
    const { fill } = this.state;

    const drawnWalls = [];
    const drawnDoors = [];

    const topLeft = { x: x - width / 2, y: y - height / 2 };

    DIRECTIONS.forEach(direction => {
      if (walls[direction]) {
        drawnWalls.push(
          <Wall
            key={`${roomId}-wall-${direction}`}
            {...{
              x: topLeft.x,
              y: topLeft.y,
              width,
              height,
              direction,
            }}
          />,
        );
      }

      if (doors[direction]) {
        drawnDoors.push(
          <Door
            key={`${roomId}-door-${direction}`}
            {...{
              x: topLeft.x,
              y: topLeft.y,
              width,
              height,
              direction,
            }}
          />,
        );
      }
    });

    return (
      <Group onClick={this.onClick} onTouchEnd={this.onClick}>
        <Rect
          x={topLeft.x}
          y={topLeft.y}
          width={width}
          height={height}
          fill={fill}
          strokeEnabled
          strokeWidth={1}
          stroke="#b09d79"
        />

        {drawnWalls}
        {drawnDoors}
      </Group>
    );
  }
}

Tile.propTypes = {
  x: number.isRequired,
  y: number.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  walls: objectOf(bool),
  doors: objectOf(bool),
  roomId: string.isRequired,
  addRooms: func.isRequired,
  coords: objectOf(number).isRequired,
};

Tile.defaultProps = {
  floorColor: '#cccccc',
  walls: {},
  doors: {},
};

export default Tile;
