import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number, func } from 'prop-types';

import Viewport from 'components/viewport';

import style from './style.scss';

import { generateDungeon } from '../../utils/dungeon';
import { changeZoomLevel } from '../../ducks/viewport';

import randomRgb from '../../utils/random-rgb';

class App extends Component {
  static propTypes = {
    width: number.isRequired,
    height: number.isRequired,
    zoomLevel: number.isRequired,
    changeZoomLevel: func.isRequired,
  };

  state = { dungeon: generateDungeon(7), players: [] };

  componentDidMount() {
    window.app = this;

    this.state.players = this.getPlayers(this.state.dungeon);
  }

  onScroll = e => {
    e.stopPropagation();
    e.preventDefault();
    this.props.changeZoomLevel(e.deltaY / 150);
  };

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

  render() {
    const { width, height, zoomLevel } = this.props;

    return (
      <div className={style.app} onWheel={this.onScroll}>
        <Viewport
          {...{
            width,
            height,
            zoomLevel,
            onScroll: this.onScroll,
            dungeon: this.state.dungeon,
            players: this.state.players,
          }}
        />

        <div className={style.menu}>
          <button onClick={this.makeNew}>new map</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => state.viewport;

const mapDispatchToProps = dispatch => ({
  changeZoomLevel: inc => dispatch(changeZoomLevel(inc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
