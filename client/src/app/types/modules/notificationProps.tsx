import { SocketResponse } from '../socketResponses';
export interface NotificationProps extends SocketResponse {
  onLeftSwipe?: () => void;
  onRightSwipe?: () => void;
}
export interface NotificationTileProps extends Pick<NotificationProps, any> {
  id: string;
  title: string;
  desc: string;
  img?: string;
  time: number;
  onLeftSwipe?: () => void;
  onRightSwipe?: () => void;
}
