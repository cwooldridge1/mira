import React from 'react';
import { NotificationProps } from '../../types';

const withNotification = (
  WrapperComponent: React.ComponentType<NotificationProps>
) => {
  return (props: NotificationProps) => {
    return <WrapperComponent {...props} />;
  };
};

export default withNotification;
