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

    zoomIn: func.isRequired,
    zoomOut: func.isRequired,
  };

  state = { dungeon: generateDungeon(7) };

  componentDidMount() {
    window.app = this;
  }

  handleClick = () => {
    this.setState({
      dungeon: generateDungeon(7),
    });
  };

  zoomIn = () => {
    this.props.zoomIn();
  };

  zoomOut = () => {
    this.props.zoomOut();
  };

  render() {
    const { width, height, zoomLevel } = this.props;

    return (
      <div className={style.app}>
        <Viewport
          {...{ width, height, zoomLevel, dungeon: this.state.dungeon }}
        />

        <div className={style.menu}>
          <button onClick={this.handleClick}>new map</button>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
