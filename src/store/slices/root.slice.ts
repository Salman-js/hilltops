import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './auth.slice';
import dataSlice from './basic.slice';
import modalSlice from './modal.slice';
export const rootReducer = combineReducers({
  auth: authSlice,
  data: dataSlice,
  modal: modalSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
