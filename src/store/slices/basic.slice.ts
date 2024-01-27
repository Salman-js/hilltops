import { IChore } from '@/Interface/Chore/chore.interface';
import { IItem } from '@/Interface/Item/item.interface';
import { IVendor } from '@/Interface/Vendor/vendor.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IData {
  items: IItem[];
  vendors: IVendor[];
  chores: IChore[];
}

const initialState: IData = {
  items: [],
  vendors: [],
  chores: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IItem>) => {
      state.items = [...state.items, action.payload];
    },
    addVendor: (state, action: PayloadAction<IVendor>) => {
      state.vendors = [...state.vendors, action.payload];
    },
    addChore: (state, action: PayloadAction<IChore>) => {
      state.chores = [...state.chores, action.payload];
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    removeVendor: (state, action: PayloadAction<string>) => {
      state.vendors = state.vendors.filter(
        (vendor) => vendor.id !== action.payload
      );
    },
    removeChore: (state, action: PayloadAction<string>) => {
      state.chores = state.chores.filter(
        (chore) => chore.id !== action.payload
      );
    },
    updateItem: (
      state,
      action: PayloadAction<{
        id: string;
        item: IItem;
      }>
    ) => {
      const { payload } = action;
      state.items = state.items.map((item) => {
        if (item.id === payload.id) {
          return payload.item;
        } else {
          return item;
        }
      });
    },
    updateVendor: (
      state,
      action: PayloadAction<{
        id: string;
        vendor: IVendor;
      }>
    ) => {
      const { payload } = action;
      state.vendors = state.vendors.map((vendor) => {
        if (vendor.id === payload.id) {
          return payload.vendor;
        } else {
          return vendor;
        }
      });
    },
    updateChore: (
      state,
      action: PayloadAction<{
        id: string;
        chore: IChore;
      }>
    ) => {
      const { payload } = action;
      state.chores = state.chores.map((chore) => {
        if (chore.id === payload.id) {
          return payload.chore;
        } else {
          return chore;
        }
      });
    },
    resetData: (state) => {
      state.chores = [];
      state.vendors = [];
      state.items = [];
    },
  },
});

export const {
  addItem,
  addVendor,
  addChore,
  updateItem,
  updateVendor,
  updateChore,
  removeItem,
  removeVendor,
  removeChore,
  resetData,
} = dataSlice.actions;

export default dataSlice.reducer;
