// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import InitialState, {
  UpdateContentAction,
  Content,
} from '../../types/redux/content';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: InitialState = {
  content: [],
  // [
  //   {
  //     type: 'code',
  //     props: { text: 'print("hello world")', language: 'python' },
  //   },
  // ],
};

export const containerSlice = createSlice({
  name: UpdateContentAction,
  initialState: initialState,
  reducers: {
    addContent: (state, action: PayloadAction<Content>) => {
      state.content.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addContent } = containerSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default containerSlice.reducer;
