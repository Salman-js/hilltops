import { IDischarge, IItem } from '@/Interface/Item/item.interface';
import { IVendor } from '@/Interface/Vendor/vendor.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPurchase } from '@/Interface/Purchase/purchase.interface';

export interface IModal {
  isVisible?: boolean;
  name?: ModalNameType;
  width?: number;
  component?: React.ReactElement;
  title?: string;
  onOk?: () => void;
  item?: ModalItemType;
}
export type ModalNameType = 'item' | 'vendor' | 'purchase' | 'discharge';
export type ModalItemType = IVendor | IItem | IPurchase | IDischarge | null;
const initialState: IModal = {
  isVisible: false,
  width: 600,
  onOk: () => closeModal(),
  item: null,
};

export const modalSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IModal>) => {
      const { payload } = action;
      state.isVisible = true;
      state.title = payload.title;
      state.width = payload.width ?? 600;
      state.onOk = payload.onOk;
      state.name = payload.name;
      state.item = payload.item;
      state.component = payload.component;
    },
    closeModal: (state) => {
      state.isVisible = false;
      state.component = undefined;
      state.title = undefined;
      state.name = undefined;
      state.width = 600;
      state.item = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
