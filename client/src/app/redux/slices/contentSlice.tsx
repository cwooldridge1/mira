// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import InitialState, {
  UpdateContentAction,
} from '../../types/redux/contentReduxTypes';
import { ContentProps } from '../../types';
import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

const initialState: InitialState = {
  content: [],
  activeContent: null,
};

export const containerSlice = createSlice({
  name: UpdateContentAction,
  initialState: initialState,
  reducers: {
    addContent: (state, action: PayloadAction<ContentProps>) => {
      state.activeContent = action.payload;
      state.content.push(action.payload);
    },
    deleteContent: (state, action: PayloadAction<ContentProps>) => {
      let content = [...current(state.content)];
      state.content = content.filter((obj) => obj.id !== action.payload.id);
    },
    setActiveContent(state, action: PayloadAction<ContentProps | null>) {
      state.activeContent = action.payload;
    },
    toggleContent(state) {
      if (current(state.activeContent) || current(state.content.length) === 0)
        state.activeContent = null;
      else state.activeContent = state.content[0];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addContent, deleteContent, setActiveContent, toggleContent } =
  containerSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default containerSlice.reducer;
