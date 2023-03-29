import React from 'react';
import { IconProps } from '../../../types';
import withIcon from '../../../hocs/withIcon';

export const CircleXmarkIcon = withIcon((props: IconProps) => {
  const { color = 'text-danger' } = props;
  return (
    <i className={`fa-regular fa-circle-xmark ${color} cursor-pointer`}></i>
  );
});
