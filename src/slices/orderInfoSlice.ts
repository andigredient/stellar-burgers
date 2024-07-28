import { getOrderByNumberApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TOrderInfoState = {
  order: TOrder | null;
};

const initialState: TOrderInfoState = {
  order: null
};

export const getOrderByNumber = createAsyncThunk(
  'orderInfo/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

const orderSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {},
  selectors: {
    getOrderSelector: (state) => state.order,
    getOrderNumberSelector: (state) => state.order?.number
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.order = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0] ?? null;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.order = null;
      });
  }
});

export default orderSlice.reducer;
export const { getOrderSelector, getOrderNumberSelector } =
  orderSlice.selectors;
