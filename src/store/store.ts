import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './slices/root.slice';

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['auth', 'data'],
  },
  rootReducer
);
const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});
// Infer the `RootState` and `AppDispatch` types from the store itself

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
