import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientsSlice';
import constructorReducer from '../slices/constructorSlice';
import feedsReducer from '../slices/feedSlice';
import userReducer from '../slices/userSlice';
import ordersReducer from '../slices/ordersSlice';
import orderBurgerReducer from '../slices/orderBurgerSlice';
import orderInfoReducer from '../slices/orderInfoSlice';
import { rootReducer } from './rootReducer';

const expectedReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feeds: feedsReducer,
  user: userReducer,
  orders: ordersReducer,
  orderBurger: orderBurgerReducer,
  orderInfo: orderInfoReducer
});

test('test reducer', () => {
  const UNKNOWN_ACTION = { type: 'UNKNOWN_ACTION' };
  const APP_INIT = { type: 'APP_INIT' };
  const initialState = expectedReducer(undefined, UNKNOWN_ACTION);
  expect(rootReducer(undefined, APP_INIT)).toEqual(initialState);
});
