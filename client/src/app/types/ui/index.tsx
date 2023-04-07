import { ReactNode } from 'react';

export interface IconProps {
  onClick?: () => void;
  onMouseEnter?: () => void;
  textSize?: string;
  color?: string;
  classModifier?: string;
}

export interface InteractiveContainerProps {
  children: JSX.Element | JSX.Element[] | string | ReactNode;
  onLeftSwipe?: () => void;
  onRightSwipe?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onClick?: () => void;
  className?: string;
  [key: string]: any;
}
