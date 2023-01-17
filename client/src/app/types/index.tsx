export interface NotificationProps {
  type: string;
  status: number;
  data: { [key: string]: number | string | boolean | null };
  time: number;
}
export interface NotificationTileProps extends Pick<NotificationProps, any> {
  title: string;
  desc: string;
  img?: string;
  time: number;
}
