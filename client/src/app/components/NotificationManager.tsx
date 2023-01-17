import React from 'react';
import { NotificationProps } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import withNotification from './hocs/withNotification';
import * as notificationComponents from './notifications';

interface NotificationComponents {
  [key: string]: React.ComponentType<NotificationProps>;
}
const notificationComponentsIndex: NotificationComponents =
  notificationComponents;
const NotificationManager = () => {
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const renderContent = (obj: NotificationProps, i: number) => {
    const Component = withNotification(notificationComponentsIndex[obj.type]);
    return <Component {...obj} key={i} />;
  };
  return <>{notifications.map(renderContent)}</>;
};

export default NotificationManager;
