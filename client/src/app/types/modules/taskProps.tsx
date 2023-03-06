import { SocketResponse } from '../socketResponses';
export interface Task {
  id: string;
  title: string;
  status?: 'needsAction' | 'completed';
  due: [string, null];
}

export interface TasksResponse extends SocketResponse {
  data: { tasks: Task[] };
}
