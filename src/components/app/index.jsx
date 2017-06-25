import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  number,
  func,
  shape,
  bool,
  string,
  arrayOf,
  objectOf,
} from 'prop-types';

import Viewport from 'components/viewport';

import style from './style.scss';

import { changeSocketZoom } from '../../ducks/viewport';
import { socketAddRooms } from '../../ducks/dungeon';

// import randomRgb from '../../utils/random-rgb';

const tileShape = shape({
  x: number,
  y: number,
  walls: objectOf(bool),
  doors: objectOf(bool),
});

class App extends Component {
  static propTypes = {
    width: number.isRequired,
    height: number.isRequired,
    zoomLevel: number.isRequired,

    changeZoomLevel: func.isRequired,
    addRooms: func.isRequired,

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

  state = { players: [] };

  componentDidMount() {
    window.app = this;

    this.state.players = this.getPlayers(this.props.dungeon);
  }

  onScroll = e => {
    e.stopPropagation();
    e.preventDefault();

    const max = 2;

    this.props.changeZoomLevel(
      Math.max(Math.min(e.deltaY / 150, max), -1 * max),
    );
  };

  getPlayers = () => {
    // const players = [
    //   {
    //     id: '1',
    //     fill: randomRgb(),
    //     face: 'crown',
    //   },
    //   {
    //     id: '2',
    //     fill: randomRgb(),
    //     face: 'star',
    //   },
    // ];
    // players.forEach(player => {
    //   const tileIds = Object.keys(dungeon.tiles);
    //   const tile =
    //     dungeon.tiles[tileIds[Math.floor(Math.random() * tileIds.length)]];
    //   Object.assign(player, {
    //     x: tile.x,
    //     y: tile.y,
    //   });
    // });
    const players = [];
    return players;
  };

  makeNew = () => {
    const players = this.getPlayers(this.props.dungeon);

    this.setState({
      players,
    });
  };

  render() {
    const { width, height, zoomLevel, dungeon } = this.props;

    return (
      <div className={style.app} onWheel={this.onScroll}>
        <Viewport
          {...{
            width,
            height,
            zoomLevel,
            dungeon,
            addRooms: this.props.addRooms,
            onScroll: this.onScroll,
            players: this.state.players,
          }}
        />

        <div className={style.menu} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state.viewport,
  dungeon: state.dungeon,
});

const mapDispatchToProps = dispatch => ({
  changeZoomLevel: inc => dispatch(changeSocketZoom(inc)),
  addRooms: tile => dispatch(socketAddRooms(tile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
