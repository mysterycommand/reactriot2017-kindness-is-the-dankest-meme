import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number } from 'prop-types';

import Viewport from 'components/viewport';

import style from './style.scss';

class App extends Component {
  static propTypes = {
    width: number.isRequired,
    height: number.isRequired,
  };

  state = { text: 'fetching...' };

  componentDidMount() {
    this.fetch();
  }

  handleClick = () => {
    this.setState(
      {
        text: 'fetching....',
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
        <Viewport {...{ width, height }} />
        <h1>{this.state.text}</h1>
        <button onClick={this.handleClick}>a new one</button>
      </div>
    );
  }
}

export default connect(state => state)(App);
