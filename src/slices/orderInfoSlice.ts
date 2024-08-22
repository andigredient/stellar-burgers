import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';

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

export const selectOrder = (state: { orderInfo: TOrderInfoState }) =>
  state.orderInfo.order;

export const selectOrderNumber = (state: { orderInfo: TOrderInfoState }) =>
  state.orderInfo.order?.number;

export default orderSlice.reducer;
