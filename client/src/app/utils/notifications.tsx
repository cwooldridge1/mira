import * as notificationComponents from '../components/notifications';
import { NotificationProps } from '../types';
import withNotification from '../components/hocs/withNotification';

interface NotificationComponents {
  [key: string]: React.ComponentType<NotificationProps>;
}
const notificationComponentsIndex: NotificationComponents =
  notificationComponents;

export const renderNotification = (obj: NotificationProps) => {
  const Component = withNotification(notificationComponentsIndex[obj.type]);
  return <Component {...obj} />;
};

export const getTradeNotificationTitle = (obj: NotificationProps) => {
  const { status } = obj.data;
  return status === 'accepted' || status === 'pending_new'
    ? 'Order Created!'
    : status === 'canceled'
    ? 'Order Canceled'
    : 'Order Executed';
};
