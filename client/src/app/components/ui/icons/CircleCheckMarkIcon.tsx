import React from 'react';
import { IconProps } from '../../../types';
import withIcon from '../../hocs/withIcon';

const CircleCheckMark = ({ color = 'text-success' }: IconProps) => {
  return (
    <i className={`fa-regular fa-circle-check ${color} cursor-pointer`}></i>
  );
};

export default withIcon(CircleCheckMark);
