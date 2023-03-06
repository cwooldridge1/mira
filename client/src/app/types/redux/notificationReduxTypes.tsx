import { NotificationProps } from '..';
interface InitialState {
  notifications: NotificationProps[];
  notificationToasts: NotificationProps[];
}
const UpdateNotificationAction = 'NOTIFICATIONS';
export default InitialState;
export { UpdateNotificationAction };
