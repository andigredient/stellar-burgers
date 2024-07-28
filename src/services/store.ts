import { combineReducers, configureStore } from '@reduxjs/toolkit';

import ingredientsReducer from '../slices/ingredientsSlice';
import constructorReducer from '../slices/constructorSlice';
import feedsReducer from '../slices/feedSlice';
import userReducer from '../slices/userSlice';
import ordersReducer from '../slices/ordersSlice';
import orderBurgerReducer from '../slices/orderBurgerSlice';
import orderInfoReducer from '../slices/orderInfoSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feeds: feedsReducer,
  user: userReducer,
  orders: ordersReducer,
  orderBurger: orderBurgerReducer,
  orderInfo: orderInfoReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
