import { Middleware, Dispatch, AnyAction } from 'redux';
import { io } from 'socket.io-client';
import { addContent } from '../slices/contentSlice';

const URL: string = process.env.REACT_APP_URL;

export const socketMiddleware: Middleware = (store) => {
  let socket = io(URL);
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
