import { Middleware } from 'redux';
import { io } from 'socket.io-client';
import { addContent } from '../slices/contentSlice';
import { addNotification } from '../slices/notificationSlice';

const LOCAL_URL: string = process.env.REACT_APP_LOCAL_URL;
const CLOUD_URL: string = process.env.REACT_APP_CLOUD_URL;

export const socketContentMiddleware: Middleware = (store) => {
  const socket = io(LOCAL_URL);
  socket.on('content', (data) => {
    store.dispatch(addContent(data));
  });

  return (next) => (action: any) => {
    // to emit data to server e.g.
    // if (actions.sendMessage.match(action) && socket) {
    //     socket.emit('ON_ROOM_MESSAGE', action.payload);
    // }

    next(action);
  };
};
export const socketNotificationMiddleware: Middleware = (store) => {
  const socket = io(CLOUD_URL);
  socket.on('notification', (data) => {
    store.dispatch(addNotification(data));
  });

  return (next) => (action: any) => {
    next(action);
  };
};
