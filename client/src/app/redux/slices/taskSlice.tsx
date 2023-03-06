import InitialState, {
  UpdateTasksAction,
} from '../../types/redux/taskReduxTypes';
import { TasksResponse } from '../../types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  },
});
export const { updateTasks } = taskSlice.actions;
export default taskSlice.reducer;
