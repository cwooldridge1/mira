import InitialState, {
  UpdateNotificationAction,
} from '../../types/redux/notificationReduxTypes';
import { NotificationProps } from '../../types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: InitialState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: UpdateNotificationAction,
  initialState: initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationProps>) => {
      state.notifications = [action.payload, ...state.notifications];
    },
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
