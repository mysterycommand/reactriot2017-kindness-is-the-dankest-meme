import React from 'react';
import { Stage, Layer } from 'react-konva';
import Token from 'components/token';

import './style.scss';

const App = () => {
  const w = 480;
  const h = 270;
  const hw = w / 2;
  const hh = h / 2;

  return (
    <Stage className="app" width={w} height={h}>
      <Layer>
        <Token x={hw} y={hh} radius={50} />
      </Layer>
    </Stage>
  );
};

export default App;
