import React, { Component } from 'react';
import './style.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { text: 'fetching...' };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  handleClick() {
    this.setState(
      {
        text: 'fetching....',
      },
      this.fetch,
    );
  }

  fetch() {
    fetch(`${process.env.API_ROOT}/api/test`).then(r => r.json()).then(json => {
      this.setState({
        text: json.message,
      });
    });
  }

  render() {
    return (
      <div className="app">
        <h1>{this.state.text}</h1>
        <button onClick={this.handleClick}>a new one</button>
      </div>
    );
  }
}

export default App;
