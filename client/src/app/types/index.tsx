export interface NotificationProps {
  id: string;
  type: string;
  status: number;
  time: number;
  data: { [key: string]: number | string | boolean | null };
}
export interface ContentProps {
  id: string;
  type: string;
  status: number;
  time: number;
  data: { [key: string]: number | string | boolean | null };
}
export interface NotificationTileProps extends Pick<NotificationProps, any> {
  title: string;
  desc: string;
  img?: string;
  time: number;
}
