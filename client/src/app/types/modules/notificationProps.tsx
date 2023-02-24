import { SocketResponse } from '../socketResponses';
export interface NotificationProps extends Pick<SocketResponse, any> {
  id: string;
  title: string;
  desc: string;
  img?: string;
  time: number;
  onLeftSwipe?: () => void;
  onRightSwipe?: () => void;
}
