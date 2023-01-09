import InitialState, {
  UpdateNotificationAction,
  Notification,
} from '../../types/redux/notification';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: InitialState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: UpdateNotificationAction,
  initialState: initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
