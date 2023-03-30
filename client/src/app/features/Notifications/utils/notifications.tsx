import * as notificationComponents from '../components/notifications';
import { NotificationProps } from '../../../types';

interface NotificationComponents {
  [key: string]: React.ComponentType<NotificationProps>;
}
const notificationComponentsIndex: NotificationComponents =
  notificationComponents;

export const renderNotification = (obj: NotificationProps) => {
  const Component = notificationComponentsIndex[obj.type];
  return <Component {...obj} key={obj.id} />;
};

export const getTradeNotificationTitle = (obj: NotificationProps) => {
  const { status } = obj.data;
  return status === 'accepted' || status === 'pending_new'
    ? 'Order Created!'
    : status === 'canceled'
    ? 'Order Canceled'
    : 'Order Executed';
};
