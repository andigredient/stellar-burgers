import { getOrdersApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  order: TOrder[];
};

const initialState: TOrderState = {
  order: []
};

export const getOrders = createAsyncThunk('orders/getOrders', async () =>
  getOrdersApi()
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelector: (state) => state.order
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.order = action.payload;
    });
  }
});

export default ordersSlice.reducer;
export const { getOrdersSelector } = ordersSlice.selectors;
