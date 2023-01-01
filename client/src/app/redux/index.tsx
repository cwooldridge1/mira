import { configureStore } from '@reduxjs/toolkit';
// This is how you import a reducer, based on the prior export.
import contentReducer from './slices/contentSlice';
import { socketMiddleware } from './middleware/socketIOMiddleware';
const store = configureStore({
  reducer: {
    // You are free to call the LHS what you like, but it must have a reducer on the RHS.
    content: contentReducer,
  },
  middleware: [socketMiddleware],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
