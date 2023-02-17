import { SocketResponse } from '../socketResponses';
export interface Task {
  id: string;
  title: string;
  updated: string;
  status?: 'needsAction' | 'completed';
  due: [string, null];
  deleted: boolean;
}

export interface TasksResponse extends SocketResponse {
  data: { tasks: Task[] };
}
