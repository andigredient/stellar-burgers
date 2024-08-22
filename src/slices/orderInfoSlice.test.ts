import { describe, expect, test } from '@jest/globals';
import orderReducer, {
  selectOrder,
  selectOrderNumber,
  getOrderByNumber
} from './orderInfoSlice';
import { TOrder } from '../utils/types';

describe('orderInfo reducer', () => {
  const initialState = {
    order: null
  };

  const mockOrder: TOrder = {
    _id: '1',
    ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c7'],
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2021-06-27T16:33:14.667Z',
    updatedAt: '2021-06-27T16:33:14.667Z',
    number: 3456
  };

  test('pending state', () => {
    const action = { type: getOrderByNumber.pending.type };
    const newState = orderReducer(initialState, action);
    expect(newState.order).toBe(null);
  });

  test('fulfilled state', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [mockOrder] }
    };
    const newState = orderReducer(initialState, action);
    expect(newState.order).toEqual(mockOrder);
  });

  test('fulfilled emtpy', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [] }
    };
    const newState = orderReducer(initialState, action);
    expect(newState.order).toBe(null);
  });

  test('rejected state', () => {
    const action = { type: getOrderByNumber.rejected.type };
    const newState = orderReducer(initialState, action);
    expect(newState.order).toBe(null);
  });

  test('selectors', () => {
    const state = {
      orderInfo: {
        order: mockOrder
      }
    };

    expect(selectOrder(state)).toEqual(mockOrder);
    expect(selectOrderNumber(state)).toBe(mockOrder.number);
  });

  test('handle null order', () => {
    const state = {
      orderInfo: {
        order: null
      }
    };

    expect(selectOrder(state)).toBe(null);
    expect(selectOrderNumber(state)).toBeUndefined();
  });
});
