import React from 'react';
import { Stage, Layer } from 'react-konva';
import { number } from 'prop-types';

import Token from 'components/token';

import style from './style.scss';

const Viewport = ({ width, height }) =>
  <Stage className={style.viewport} width={width} height={height}>
    <Layer>
      <Token x={width / 2} y={height / 2} radius={48} />
    </Layer>
  </Stage>;

Viewport.propTypes = {
  width: number.isRequired,
  height: number.isRequired,
};

export default Viewport;
