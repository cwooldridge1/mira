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
      //whenever we set an item as an active content we want it to be in the front of the array so the content view is always by last viewed and last added
      if (action.payload) {
        let content = [...current(state.content)].filter(
          (obj) => obj.id !== action.payload!.id
        );
        content.unshift(action.payload);
        state.content = content;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addContent, deleteContent, setActiveContent } =
  containerSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default containerSlice.reducer;
