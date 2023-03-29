import React from 'react';
import { IconProps } from '../types';

const withIcon = (WrappedComponent: React.FC<IconProps>) => {
  return (props: IconProps) => {
    let modifiedProps = props;
    if (props.textSize === undefined) {
      modifiedProps = {
        ...modifiedProps,
        textSize: 'text-xl',
      };
    }
    return (
      <span
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        className={modifiedProps.textSize + ' ' + props.classModifier}
      >
        <WrappedComponent {...modifiedProps} />
      </span>
    );
  };
};

export default withIcon;
