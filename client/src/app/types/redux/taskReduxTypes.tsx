import { Task } from '..';
interface InitialState {
  tasks: Array<Task>;
}
const UpdateTasksAction = 'TASKS';
export default InitialState;
export { UpdateTasksAction };
