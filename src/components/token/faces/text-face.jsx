import React, { Component } from 'react';
import { Group, Text } from 'react-konva';
import { number, string } from 'prop-types';

class TextFace extends Component {
  static propTypes = {
    x: number.isRequired,
    y: number.isRequired,
    fontSize: number.isRequired,
    text: string.isRequired,
    fill: string,
  };

  static defaultProps = {
    fill: 'black',
  };

  state = {
    width: 0,
    height: 0,
  };

  componentWillReceiveProps() {
    const { k } = this;

    this.setState({
      width: k.width(),
      height: k.height(),
    });
  }

  render() {
    const { x, y, fontSize, text, fill } = this.props;
    const { width, height } = this.state;

    return (
      <Group {...{ x, y }}>
        <Text
          ref={k => (this.k = k)}
          {...{
            align: 'center',
            x: -width / 2,
            y: -height / 2,
            fontSize,
            text,
            fill,
          }}
        />
      </Group>
    );
  }
}

export default TextFace;
