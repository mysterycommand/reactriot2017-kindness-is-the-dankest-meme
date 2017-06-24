import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number, func, shape } from 'prop-types';

import Viewport from 'components/viewport';

import style from './style.scss';

import { generateDungeon } from '../../utils/dungeon';
import randomRgb from '../../utils/random-rgb';
import { changeZoomLevel, changeCenterOffset } from '../../ducks/viewport';

class App extends Component {
  static propTypes = {
    width: number.isRequired,
    height: number.isRequired,
    zoomLevel: number.isRequired,
    centerOffset: shape({ x: number, y: number }).isRequired,

    zoomIn: func.isRequired,
    zoomOut: func.isRequired,
    changeCenter: func.isRequired,
  };

  state = { dungeon: generateDungeon(7), players: [] };

  componentDidMount() {
    window.app = this;

    this.state.players = this.getPlayers(this.state.dungeon);
  }

  getPlayers = dungeon => {
    const tiles = Object.keys(dungeon.rooms)
      .map(id => dungeon.rooms[id].tiles)
      .reduce((acc, val) => acc.concat(val), []);

    const players = [
      {
        id: '1',
        fill: randomRgb(),
        face: 'crown',
      },
      {
        id: '2',
        fill: randomRgb(),
        face: 'star',
      },
    ];

    players.forEach(player => {
      const tile = tiles[Math.floor(Math.random() * tiles.length)];
      Object.assign(player, {
        x: tile.x,
        y: tile.y,
      });
    });

    return players;
  };

  makeNew = () => {
    const dungeon = generateDungeon(7);
    const players = this.getPlayers(dungeon);

    this.setState({
      dungeon,
      players,
    });
  };

  viewportClick = e => {
    const offset = {
      x: -1 * (e.evt.layerX - this.props.width / 2),
      y: -1 * (e.evt.layerY - this.props.height / 2),
    };

    this.props.changeCenter(offset);
  };

  zoomIn = () => {
    this.props.zoomIn();
  };

  zoomOut = () => {
    this.props.zoomOut();
  };

  render() {
    const { width, height, zoomLevel, centerOffset } = this.props;

    return (
      <div className={style.app}>
        <Viewport
          {...{
            width,
            height,
            zoomLevel,
            centerOffset,
            onClick: this.viewportClick,
            dungeon: this.state.dungeon,
            players: this.state.players,
          }}
        />

        <div className={style.menu}>
          <button onClick={this.makeNew}>new map</button>
          <button onClick={this.zoomOut}>-</button>
          <button onClick={this.zoomIn}>+</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => state.viewport;

const mapDispatchToProps = dispatch => ({
  zoomIn: () => dispatch(changeZoomLevel(0.1)),
  zoomOut: () => dispatch(changeZoomLevel(-0.1)),
  changeCenter: offset => dispatch(changeCenterOffset(offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
