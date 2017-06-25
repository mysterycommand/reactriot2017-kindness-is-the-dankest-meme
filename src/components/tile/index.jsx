import React, { Component } from 'react';
import { Rect, Group } from 'react-konva';
import { objectOf, number, string, bool, func } from 'prop-types';

import Wall from './wall';
import Door from './door';
import { DIRECTIONS } from '../../utils/dungeon';

class Tile extends Component {
  onClick = () => {
    this.props.addRooms({
      x: this.props.coords.x,
      y: this.props.coords.y,
      doors: this.props.doors,
    });
  };

  render() {
    const {
      x,
      y,
      width,
      height,
      floorColor,
      walls,
      doors,
      roomId,
    } = this.props;

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
      <Group onClick={this.onClick}>
        <Rect
          x={topLeft.x}
          y={topLeft.y}
          width={width}
          height={height}
          fill={floorColor}
          strokeEnabled
          strokeWidth={1}
          stroke={floorColor}
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
  floorColor: string,
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
