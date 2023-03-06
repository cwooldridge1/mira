import * as notificationComponents from '../components/notifications';
import { NotificationProps } from '../types';
import withNotification from '../components/hocs/withNotification';

interface NotificationComponents {
  [key: string]: React.ComponentType<NotificationProps>;
}
const notificationComponentsIndex: NotificationComponents =
  notificationComponents;

export const renderNotification = (obj: NotificationProps, i: number) => {
  const Component = withNotification(notificationComponentsIndex[obj.type]);
  return <Component {...obj} key={i} />;
};

export default renderNotification;
