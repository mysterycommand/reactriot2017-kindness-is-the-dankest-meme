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
    width: null,
    height: null,
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

    let { width, height } = this.state;

    if (width === null) {
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.font = `${fontSize}px Arial`;
      const size = ctx.measureText(text);

      width = size.width;
    }

    if (height === null) {
      height = fontSize;
    }

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
