import { IUser } from '@/Interface/User/user.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  user?: IUser | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setAuthenticated, logout } = counterSlice.actions;

export default counterSlice.reducer;
