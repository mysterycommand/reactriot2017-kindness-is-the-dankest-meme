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

  render() {
    const { x, y, fontSize, text, fill } = this.props;

    const ctx = document.createElement('canvas').getContext('2d');
    ctx.font = `${fontSize}px Arial`;
    const size = ctx.measureText(text);

    // not perfect, but fine
    const width = size.width;
    const height = fontSize;

    return (
      <Group {...{ x, y }}>
        <Text
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
