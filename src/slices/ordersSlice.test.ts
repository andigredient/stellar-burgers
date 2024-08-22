import { describe, expect, test } from '@jest/globals';
import ordersReducer, {
  getOrders,
  getOrdersSelector,
  initialState
} from './ordersSlice';
import { TOrder } from '@utils-types';

describe('ordersReducer tests', () => {
  const mockOrders: TOrder[] = [
    {
      _id: '1',
      ingredients: ['643d69a5c3f7b9001cfa093c'],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      number: 1
    }
  ];

  const mockPayload = mockOrders;

  test('initial state', () => {
    const action = { type: 'unknown' };
    const state = ordersReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  test('pending state', () => {
    const action = { type: getOrders.pending.type };
    const newState = ordersReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('fulfilled state', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: mockPayload
    };
    const newState = ordersReducer(initialState, action);
    expect(newState).toEqual({
      order: mockPayload,
      isLoading: false
    });
  });

  test('rejected state', () => {
    const action = { type: getOrders.rejected.type };
    const newState = ordersReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      isLoading: false
    });
  });

  test('empty orders', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: []
    };
    const newState = ordersReducer(initialState, action);
    expect(newState).toEqual({
      order: [],
      isLoading: false
    });
  });

  test('order state', () => {
    const state = {
      orders: {
        order: mockOrders,
        isLoading: false
      }
    };
    const selectedState = getOrdersSelector(state);
    expect(selectedState).toEqual(state.orders.order);
  });
});
