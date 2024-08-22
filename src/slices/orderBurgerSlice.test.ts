import { describe, expect, test } from '@jest/globals';
import orderBurgerReducer, {
  selectOrder,
  selectOrderName,
  selectRequestInProgress
} from './orderBurgerSlice';
import { orderBurger } from './orderBurgerSlice';
import { TOrder } from '@utils-types';

describe('orderBurger reducer', () => {
  const initialState = {
    order: null,
    name: '',
    orderRequest: false
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

  test('handle pending state', () => {
    const action = { type: orderBurger.pending.type };
    const newState = orderBurgerReducer(initialState, action);
    expect(newState.order).toBe(null);
    expect(newState.orderRequest).toBe(true);
  });

  test('handle fulfilled state', () => {
    const action = {
      type: orderBurger.fulfilled.type,
      payload: {
        order: mockOrder,
        name: 'Space флюоресцентный бургер'
      }
    };
    const newState = orderBurgerReducer(initialState, action);
    expect(newState.order).toEqual(mockOrder);
    expect(newState.name).toBe('Space флюоресцентный бургер');
    expect(newState.orderRequest).toBe(false);
  });

  test('handle rejected state', () => {
    const action = { type: orderBurger.rejected.type };
    const newState = orderBurgerReducer(initialState, action);
    expect(newState.order).toBe(null);
    expect(newState.orderRequest).toBe(false);
  });
});
