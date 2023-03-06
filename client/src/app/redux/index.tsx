import { configureStore } from '@reduxjs/toolkit';
// This is how you import a reducer, based on the prior export.
import contentReducer from './slices/contentSlice';
import notificationReducer from './slices/notificationSlice';
import taskReducer from './slices/taskSlice';
import {
  socketContentMiddleware,
  socketNotificationMiddleware,
} from './middleware/socketIOMiddleware';
const store = configureStore({
  reducer: {
    // You are free to call the LHS what you like, but it must have a reducer on the RHS.
    content: contentReducer,
    notifications: notificationReducer,
    tasks: taskReducer,
  },
  middleware: [socketContentMiddleware, socketNotificationMiddleware],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
