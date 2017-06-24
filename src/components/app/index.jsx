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
  };

  state = { text: 'fetching...', dungeon: generateDungeon(7) };

  componentDidMount() {
    this.fetch();

    window.app = this;
  }

  handleClick = () => {
    this.setState(
      {
        text: 'fetching....',
        dungeon: generateDungeon(7),
      },
      this.fetch,
    );
  };

  fetch() {
    fetch(`${process.env.API_ROOT}/api/test`).then(r => r.json()).then(json => {
      this.setState({
        text: json.message,
      });
    });
  }

  render() {
    const { width, height } = this.props;

    return (
      <div className={style.app}>
        <Viewport {...{ width, height, dungeon: this.state.dungeon }} />

        <div className={style.menu}>
          <h1>{this.state.text}</h1>
          <button onClick={this.handleClick}>a new one</button>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(App);
