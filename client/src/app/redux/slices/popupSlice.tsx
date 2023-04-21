// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import InitialState, {
  UpdatePopupAction,
} from '../../types/redux/popupReduxTypes';
import { PopupProps } from '../../types';
import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

const initialState: InitialState = {
  popups: [],
};

export const popupSlice = createSlice({
  name: UpdatePopupAction,
  initialState: initialState,
  reducers: {
    addPopup: (state, action: PayloadAction<PopupProps>) => {
      state.popups.push(action.payload);
    },
    deletePopup: (state, action: PayloadAction<PopupProps>) => {
      let popups = [...current(state.popups)];
      state.popups = popups.filter((obj) => obj.id !== action.payload.id);
    },
  },
});

export const { addPopup, deletePopup } = popupSlice.actions;
export default popupSlice.reducer;
