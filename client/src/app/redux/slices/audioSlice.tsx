// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import InitialState, { AudioAction } from '../../types/redux/audioReduxTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: InitialState = {
  transcripts: [],
  audio: [],
  serverIsListening: false,
  serverIsLoadingResponse: false,
  serverErrorMsg: null,
};

export const containerSlice = createSlice({
  name: AudioAction,
  initialState: initialState,
  reducers: {
    addTranscript: (state, action: PayloadAction<string>) => {
      action.payload.length && state.transcripts.push(action.payload);
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

// Action creators are generated for each case reducer function
export const {
  addTranscript,
  setServerIsListening,
  setServerIsLoadingResponse,
  setServerErrorMsg,
} = containerSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default containerSlice.reducer;
