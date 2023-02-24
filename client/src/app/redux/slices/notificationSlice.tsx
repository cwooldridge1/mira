import InitialState, {
  UpdateNotificationAction,
} from '../../types/redux/notificationReduxTypes';
import { NotificationProps } from '../../types';

import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

const initialState: InitialState = {
  notifications: [],
  notificationToasts: [],
};

export const notificationSlice = createSlice({
  name: UpdateNotificationAction,
  initialState: initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationProps>) => {
      state.notifications = [action.payload, ...current(state.notifications)];
      state.notificationToasts = [
        action.payload,
        ...current(state.notificationToasts),
      ];
    },
    deleteNotificationToastById: (state, action: PayloadAction<string>) => {
      let content = [...current(state.notificationToasts)];
      state.notificationToasts = content.filter(
        (obj) => obj.id !== action.payload
      );
    },
    deleteNotificationById: (state, action: PayloadAction<string>) => {
      let content = [...current(state.notifications)];
      state.notifications = content.filter((obj) => obj.id !== action.payload);
    },
  },
});

export const {
  addNotification,
  deleteNotificationById,
  deleteNotificationToastById,
} = notificationSlice.actions;
export default notificationSlice.reducer;
