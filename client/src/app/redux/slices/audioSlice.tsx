// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import InitialState, { AudioAction } from '../../types/redux/audioReduxTypes';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

const BUFFER_LENGTH = 50;

const initialState: InitialState = {
  transcripts: [],
  audio: [],
  serverIsListening: false,
  serverIsLoadingResponse: false,
  serverErrorMsg: null,
};

export const audioSlice = createSlice({
  name: AudioAction,
  initialState: initialState,
  reducers: {
    addTranscript: (state, action: PayloadAction<string>) => {
      let arr = [...current(state.transcripts), action.payload];
      // this is likely going to constanly be getting data so we need to treat it as a circular buffer
      if (arr.length > BUFFER_LENGTH) {
        arr = arr.slice(arr.length - BUFFER_LENGTH);
      }
      state.transcripts = arr;
    },
    setServerIsListening: (state, action: PayloadAction<boolean>) => {
      state.serverIsListening = action.payload;
    },
    setServerIsLoadingResponse: (state, action: PayloadAction<boolean>) => {
      state.serverIsLoadingResponse = action.payload;
    },
    setServerErrorMsg: (state, action: PayloadAction<string>) => {
      state.serverErrorMsg = action.payload;
    },
  },
});

export const {
  addTranscript,
  setServerIsListening,
  setServerIsLoadingResponse,
  setServerErrorMsg,
} = audioSlice.actions;
export default audioSlice.reducer;
