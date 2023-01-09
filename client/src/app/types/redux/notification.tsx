export interface Notification {
  type: string;
  props: object;
}
interface InitialState {
  notifications: Array<Notification>;
}
const UpdateNotificationAction = 'NOTIFICATIONS';
export default InitialState;
export { UpdateNotificationAction };
