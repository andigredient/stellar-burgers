import { getOrdersApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  order: TOrder[];
  isLoading: boolean;
};

export const initialState: TOrderState = {
  order: [],
  isLoading: false
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
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export default ordersSlice.reducer;
export const { getOrdersSelector } = ordersSlice.selectors;
