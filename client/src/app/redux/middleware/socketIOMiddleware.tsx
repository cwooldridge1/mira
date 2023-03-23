import { Middleware } from 'redux';
import { io } from 'socket.io-client';
import { addContent } from '../slices/contentSlice';
import { addNotification } from '../slices/notificationSlice';
import { updateTasks } from '../slices/taskSlice';
import {
  setServerIsListening,
  setServerIsLoadingResponse,
  setServerErrorMsg,
} from '../slices/audioSlice';

//@ts-ignore
import notificationAudio from '../../../assets/sounds/notificationAudio.mp3';
import { listener } from '../../../listener';

const SERVER_URL: string = process.env.REACT_APP_SERVER_URL;

export const socketioMiddleware: Middleware = (store) => {
  const socket = io(SERVER_URL);

  socket.on('notification', (data) => {
    const audio = new Audio(notificationAudio);
    audio.play();
    store.dispatch(addNotification(data));
  });

  socket.on('wake', (data) => {
    store.dispatch(setServerIsListening(true));
  });

  socket.on('loading-response', (data) => {
    store.dispatch(setServerIsListening(false));
    store.dispatch(setServerIsLoadingResponse(true));
  });

  socket.on('error', (data) => {
    store.dispatch(setServerErrorMsg(data.data.msg));
    store.dispatch(setServerIsListening(false));
    store.dispatch(setServerIsLoadingResponse(false));
  });

  socket.on('content', (data) => {
    store.dispatch(addContent(data));
    store.dispatch(setServerIsLoadingResponse(false));
  });

  socket.on('tasks', (data) => {
    store.dispatch(updateTasks(data));
    store.dispatch(setServerIsLoadingResponse(false));
  });

  listener();

  return (next) => (action: any) => {
    if (action.type === 'AUDIO/addTranscript') {
      socket.emit('transcript', action.payload);
    }
    next(action);
  };
};
