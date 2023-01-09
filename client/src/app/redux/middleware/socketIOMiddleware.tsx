import { Middleware, Dispatch, AnyAction } from 'redux';
import { io } from 'socket.io-client';
import { addContent } from '../slices/contentSlice';

const LOCAL_URL: string = process.env.REACT_APP_LOCAL_URL;
const CLOUD_URL: string = process.env.REACT_APP_CLOUD_URL;

export const socketContentMiddleware: Middleware = (store) => {
  console.log(LOCAL_URL);
  const socket = io(LOCAL_URL);
  socket.on('content', (data) => {
    store.dispatch(addContent(data));
  });

  return (next) => (action: any) => {
    // to emit data to server
    // if (actions.sendMessage.match(action) && socket) {
    //     socket.emit('ON_ROOM_MESSAGE', action.payload);
    // }

    next(action);
  };
};
export const socketNotificationMiddleware: Middleware = (store) => {
  const socket = io('http://127.0.0.1:5001');
  socket.on('notification', (data) => {
    console.log(data);
  });

  return (next) => (action: any) => {
    next(action);
  };
};
