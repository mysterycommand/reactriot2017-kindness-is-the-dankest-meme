import React from 'react';
import { Stage, Layer } from 'react-konva';
import { number } from 'prop-types';

import Token from 'components/token';

import style from './style.scss';

const Viewport = ({ width, height }) => {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return (
    <Stage className={style.viewport} width={width} height={height}>
      <Layer>
        <Token x={halfWidth - 60} y={halfHeight} radius={48} face="star" />
        <Token x={halfWidth + 60} y={halfHeight} radius={48} />
      </Layer>
    </Stage>
  );
};

Viewport.propTypes = {
  width: number.isRequired,
  height: number.isRequired,
};

export default Viewport;
