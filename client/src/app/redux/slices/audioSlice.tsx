// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import InitialState, { AudioAction } from '../../types/redux/audioReduxTypes';
import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

const initialState: InitialState = {
  transcripts: [],
  audio: [],
};

export const containerSlice = createSlice({
  name: AudioAction,
  initialState: initialState,
  reducers: {
    addTranscript: (state, action: PayloadAction<string>) => {
      //   console.log(action.payload);
      //   state.transcripts.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTranscript } = containerSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default containerSlice.reducer;
