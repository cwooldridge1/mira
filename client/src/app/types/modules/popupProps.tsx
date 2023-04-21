import { SocketResponse } from '../socketResponses';
export interface PopupProps extends SocketResponse {
  onClose?: () => void;
}
