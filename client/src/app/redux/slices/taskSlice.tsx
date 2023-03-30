import InitialState, {
  UpdateTasksAction,
} from '../../types/redux/taskReduxTypes';
import { TasksResponse } from '../../types';

import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

const SERVER_URL: string = process.env.REACT_APP_SERVER_URL;
const initialState: InitialState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: UpdateTasksAction,
  initialState: initialState,
  reducers: {
    updateTasks: (state, action: PayloadAction<TasksResponse>) => {
      state.tasks = action.payload.data.tasks;
    },
    deleteTaskById: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.tasks = current(state.tasks).filter((t) => t.id !== id);

      fetch(`${SERVER_URL}/tasks?id=${id}`, {
        method: 'DELETE',
      });
    },
  },
});
export const { updateTasks, deleteTaskById } = taskSlice.actions;
export default taskSlice.reducer;
