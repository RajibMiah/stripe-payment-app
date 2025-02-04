import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import checkoutSlice from '@redux/slices/checkoutSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    storage,
};
const rootReducer = combineReducers({
    auth: authReducer,
    checkout: checkoutSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
