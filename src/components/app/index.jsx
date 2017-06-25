import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  number,
  func,
  shape,
  bool,
  string,
  array,
  arrayOf,
  objectOf,
} from 'prop-types';

import Viewport from 'components/viewport';

import style from './style.scss';

import { socketAddRooms } from '../../ducks/dungeon';
import { socketTryToMove } from '../../ducks/players';

import distance from '../../utils/distance';
import { DIRECTIONS, getTileId, tileInDirection } from '../../utils/dungeon';
import throttle from '../../utils/throttle';

const { max, min } = Math;

const tileShape = shape({
  x: number,
  y: number,
  walls: objectOf(bool),
  doors: objectOf(bool),
});

class App extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    players: array.isRequired,

    addRooms: func.isRequired,
    tryToMove: func.isRequired,

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

  state = {
    width: 480,
    height: 270,
    zoomLevel: 1,
    touchDistance: -1,
  };

  componentDidMount() {
    window.app = this;
    window.addEventListener('resize', this.onResize);
    this.onResize({ target: window });
  }

  onResize = ({ target }) => {
    const { innerWidth: width, innerHeight: height } = target;
    this.setState({ width, height });
  };

  onScroll = e => {
    e.stopPropagation();
    e.preventDefault();

    const deltaMax = 2;
    const increment = Math.max(
      Math.min(e.deltaY / 150, deltaMax),
      -1 * deltaMax,
    );

    throttle('change_zoom', () => this.changeZoomLevel(increment));
  };

  onTouchStart = event => {
    const { touches } = event;
    if (touches.length !== 2) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();

    const { clientX: x0, clientY: y0 } = touches[0];
    const { clientX: x1, clientY: y1 } = touches[1];
    const touchDistance = distance(x0, y0, x1, y1);

    this.setState({
      touchDistance,
    });
  };

  onTouchMove = event => {
    const { touches } = event;
    if (touches.length !== 2) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();

    const { clientX: x0, clientY: y0 } = touches[0];
    const { clientX: x1, clientY: y1 } = touches[1];
    const touchDistance = distance(x0, y0, x1, y1);

    const deltaMax = 2;
    const delta = this.state.touchDistance - touchDistance;
    this.changeZoomLevel(max(min(-delta / 10, deltaMax), -deltaMax));

    this.setState({
      touchDistance,
    });
  };

  onTileClick = tile => {
    const yous = this.props.players.filter(p => p.isYou);
    if (yous.length === 0) {
      return;
    }

    const you = yous[0];
    const currentTileId = getTileId({ x: you.x, y: you.y });
    const currentTile = this.props.dungeon.tiles[currentTileId];
    const tryingMove = getTileId(tile);

    const validMove =
      DIRECTIONS.filter(dir => {
        if (currentTile.walls[dir] && !currentTile.doors[dir]) {
          return false;
        }

        const id = getTileId(tileInDirection(you.x, you.y, dir));
        const dirTile = this.props.dungeon.tiles[id];

        return dirTile && id === tryingMove;
      }).length > 0;

    if (!validMove) {
      return;
    }

    this.props.tryToMove(tile);
    this.props.addRooms(tile);
  };

  changeZoomLevel = increment => {
    const zoomLevel = min(max(this.state.zoomLevel + increment, 0.01), 25);

    this.setState({ zoomLevel });
  };

  render() {
    const { dungeon } = this.props;
    const { width, height, zoomLevel } = this.state;

    return (
      <div
        className={style.app}
        onWheel={this.onScroll}
        {...{
          onTouchStart: this.onTouchStart,
          onTouchMove: this.onTouchMove,
        }}
      >
        <Viewport
          {...{
            width,
            height,
            zoomLevel,
            dungeon,
            addRooms: this.onTileClick,
            onScroll: this.onScroll,
            players: this.props.players,
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  dungeon: state.dungeon,
  players: state.players,
});

const mapDispatchToProps = dispatch => ({
  addRooms: tile => dispatch(socketAddRooms(tile)),
  tryToMove: tile => dispatch(socketTryToMove(tile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
