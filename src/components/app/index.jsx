import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number, func, shape } from 'prop-types';

import Viewport from 'components/viewport';

import style from './style.scss';

import { generateDungeon } from '../../utils/dungeon';
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

  state = { dungeon: generateDungeon(7) };

  componentDidMount() {
    window.app = this;
  }

  makeNew = () => {
    this.setState({
      dungeon: generateDungeon(7),
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
