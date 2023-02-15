import React from 'react';
import { IconProps } from '../../../types';
import withIcon from '../../hocs/withIcon';

const CirlceXmarkIcon = ({ color = 'text-danger' }: IconProps) => {
  return (
    <i className={`fa-regular fa-circle-xmark ${color} cursor-pointer`}></i>
  );
};

export default withIcon(CirlceXmarkIcon);
