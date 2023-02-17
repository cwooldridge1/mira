import { SocketResponse } from '../socketResponses';
export interface NotificationProps extends Pick<SocketResponse, any> {
  title: string;
  desc: string;
  img?: string;
  time: number;
}
