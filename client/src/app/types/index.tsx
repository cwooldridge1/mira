export type { IconProps } from './ui';

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
  data: any; //{ [key: string]: number | string | boolean | null };
}

interface Task {
  id: string;
  title: string;
  updated: string;
  status?: 'needsAction' | 'completed';
  due: [string, null];
  deleted: boolean;
}

export interface TasksContentProps extends ContentProps {
  data: { tasks: Task[] };
}
export interface NotificationTileProps extends Pick<NotificationProps, any> {
  title: string;
  desc: string;
  img?: string;
  time: number;
}
