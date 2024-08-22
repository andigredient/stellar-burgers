import { TOrder } from '@utils-types';
import feedSliceReducer, {
  feedsReducer,
  getFeeds,
  getFeedSelector
} from './feedSlice';
import { Action } from '@reduxjs/toolkit';
import { initialState } from './feedSlice';

describe('reducer feed slicce', () => {
  const mockOrders: TOrder[] = [
    {
      _id: '1',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-06-14T18:14:47.162Z',
      updatedAt: '2024-06-14T18:14:47.537Z',
      number: 42463
    },
    {
      _id: '2',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'pending',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-06-14T18:12:42.449Z',
      updatedAt: '2024-06-14T18:12:42.920Z',
      number: 42462
    }
  ];

  const mockPayload = {
    orders: mockOrders,
    total: 50,
    totalToday: 10
  };

  test('initianl state', () => {
    expect(feedSliceReducer(undefined, {} as Action)).toEqual(initialState);
  });

  test('get pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, isFeedsLoading: true });
  });

  test('get rejected', () => {
    const action = {
      type: getFeeds.rejected.type
    };
    const state = feedsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isFeedsLoading: false
    });
  });

  test('get fulfilled', () => {
    const action = { type: getFeeds.fulfilled.type, payload: mockPayload };
    const state = feedsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: mockPayload.orders,
      total: mockPayload.total,
      totalToday: mockPayload.totalToday,
      isFeedsLoading: false
    });
  });

  test('getFeedSelector should return the feed state', () => {
    const state = {
      feeds: {
        orders: mockOrders,
        total: 50,
        totalToday: 10,
        isFeedsLoading: false
      }
    };

    const selectedState = getFeedSelector(state);
    expect(selectedState).toEqual(state.feeds);
  });
});
