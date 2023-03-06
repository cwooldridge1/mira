export interface IconProps {
  onClick?: () => void;
  onMouseEnter?: () => void;
  textSize?: string;
  color?: string;
  classModifier?: string;
}

export interface InteractiveContainerProps {
  children: JSX.Element | JSX.Element[] | string;
  onLeftSwipe?: () => void;
  onRightSwipe?: () => void;
  [key: string]: any;
}
