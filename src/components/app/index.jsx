import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number } from 'prop-types';

import Viewport from 'components/viewport';

import style from './style.scss';

import { generateDungeon } from '../../utils/dungeon';

class App extends Component {
  static propTypes = {
    width: number.isRequired,
    height: number.isRequired,
    zoomLevel: number.isRequired,
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

  render() {
    const { width, height, zoomLevel } = this.props;

    return (
      <div className={style.app}>
        <Viewport
          {...{ width, height, zoomLevel, dungeon: this.state.dungeon }}
        />

        <div className={style.menu}>
          <button onClick={this.handleClick}>new map</button>
        </div>
      </div>
    );
  }
}

export default connect(state => state.viewport)(App);
