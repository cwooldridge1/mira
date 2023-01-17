import { NotificationProps } from '..';
interface InitialState {
  notifications: Array<NotificationProps>;
}
const UpdateNotificationAction = 'NOTIFICATIONS';
export default InitialState;
export { UpdateNotificationAction };
