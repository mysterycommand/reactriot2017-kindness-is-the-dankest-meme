import React from 'react';
import { Path } from 'react-konva';
import { number, string } from 'prop-types';

const Crown = ({ x, y, width, height, fill }) => {
  const data = [
    `M ${x - width / 2} ${y - height / 2}`,
    `L ${x - width / 4.5} ${y}`,
    `L ${x} ${y - height / 1.5}`,
    `L ${x + width / 4.5} ${y}`,
    `L ${x + width / 2} ${y - height / 2}`,
    `L ${x + width / 2} ${y + height / 2}`,
    `L ${x - width / 2} ${y + height / 2}`,
    'Z',
  ].join();

  return <Path data={data} fill={fill} />;
};

Crown.propTypes = {
  x: number.isRequired,
  y: number.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  fill: string,
};

Crown.defaultProps = {
  fill: 'black',
};

export default Crown;
