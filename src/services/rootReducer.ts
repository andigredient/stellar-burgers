import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientsSlice';
import constructorReducer from '../slices/constructorSlice';
import feedsReducer from '../slices/feedSlice';
import userReducer from '../slices/userSlice';
import ordersReducer from '../slices/ordersSlice';
import orderBurgerReducer from '../slices/orderBurgerSlice';
import orderInfoReducer from '../slices/orderInfoSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feeds: feedsReducer,
  user: userReducer,
  orders: ordersReducer,
  orderBurger: orderBurgerReducer,
  orderInfo: orderInfoReducer
});
