import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number, func } from 'prop-types';

import Viewport from 'components/viewport';

import style from './style.scss';

import { generateDungeon } from '../../utils/dungeon';
import { changeZoomLevel } from '../../ducks/viewport';

class App extends Component {
  static propTypes = {
    width: number.isRequired,
    height: number.isRequired,
    zoomLevel: number.isRequired,
    changeZoomLevel: func.isRequired,
  };

  state = { dungeon: generateDungeon(7) };

  componentDidMount() {
    window.app = this;
  }

  onScroll = e => {
    this.props.changeZoomLevel(e.deltaY / 150);
  };

  makeNew = () => {
    this.setState({
      dungeon: generateDungeon(7),
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
            centerOffset: { x: 0, y: 0 },
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
