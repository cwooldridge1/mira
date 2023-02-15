import React from 'react';

type Props = {
  icon: string;
  iconSize?: string;
  color?: string;
  showBell?: boolean;
  onClick?: () => void;
};

const NotificationButton = ({
  icon,
  iconSize,
  showBell,
  color,
  onClick,
}: Props) => {
  return (
    <div
      className="m-6 inline-flex relative w-fit cursor-pointer"
      onClick={onClick}
    >
      {showBell && (
        <div className="absolute inline-block top-0 right-auto bottom-auto left-0 -translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 p-1.5 text-xs bg-danger rounded-full z-10"></div>
      )}
      <div
        className={`px-2 py-2 flex items-center justify-center text-center rounded-lg shadow-lg ${color}`}
      >
        <div className={iconSize}>
          <i className={`mx-auto text-white w-10 ${icon}`}></i>
        </div>
      </div>
    </div>
  );
};

NotificationButton.defaultProps = {
  iconSize: 'text-2xl',
  color: 'bg-info',
  showBell: false,
};
export default NotificationButton;
