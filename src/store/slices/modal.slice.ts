import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IModal {
  isVisible: boolean;
  name?: string;
  width?: number;
  component?: React.ReactElement;
  title?: string;
}

const initialState: IModal = {
  isVisible: false,
  width: 600,
};

export const modalSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IModal>) => {
      const { payload } = action;
      state.isVisible = true;
      state.component = payload.component;
      state.title = payload.title;
      state.width = payload.width ?? 600;
    },
    closeModal: (state) => {
      state.isVisible = false;
      state.component = undefined;
      state.title = undefined;
      state.name = undefined;
      state.width = 600;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
