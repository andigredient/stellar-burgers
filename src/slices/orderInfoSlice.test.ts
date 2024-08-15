import orderInfoSliceReducer from './orderInfoSlice';

describe('редьюсер слайса orderInfo', () => {
  const initialOrderInfoState = {
    order: {
      _id: '666c889797ede0001d070b96',
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
    }
  };

  test('идет отправка запроса', () => {
    const action = {
      type: 'getOrderInfo/pending'
    };
    const newState = orderInfoSliceReducer(initialOrderInfoState, action);
    const { order } = newState;
    expect(order).toBe(null);
  });

  test('получены данные о заказе', () => {
    const expectedResult = {
        _id: '666c881a97ede0001d070b93',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-06-14T18:12:42.449Z',
        updatedAt: '2024-06-14T18:12:42.920Z',
        number: 42462
    };
    const action = {
      type: 'getOrderInfo/fulfilled',
      payload: {orders: [expectedResult]}
    };
    const newState = orderInfoSliceReducer(initialOrderInfoState, action);
    const { order } = newState;
    expect(order).toEqual(expectedResult);
  });
});
