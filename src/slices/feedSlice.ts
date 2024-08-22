import { getFeedsApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isFeedsLoading: boolean;
};

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isFeedsLoading: true
};

export const getFeeds = createAsyncThunk('feeds/all', async () =>
  getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isFeedsLoading = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isFeedsLoading = false;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.isFeedsLoading = false;
      });
  }
});

export default feedSlice.reducer;
export const { getFeedSelector } = feedSlice.selectors;
export const feedsReducer = feedSlice.reducer;
