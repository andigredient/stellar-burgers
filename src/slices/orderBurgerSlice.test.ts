import orderBurgerSliceReducer from './orderBurgerSlice';

describe('редьюсер слайса orderBurger', () => {
  const initialOrderBurgerState = {
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
    },
    name: 'Краторный люминесцентный бургер',
    orderRequest: false
  };

  test('идет отправка запроса', () => {
    const action = {
      type: 'orders/newOrder/pending'
    };
    const newState = orderBurgerSliceReducer(initialOrderBurgerState, action);
    const { order, orderRequest } = newState;
    expect(order).toBe(null);
    expect(orderRequest).toBe(true);
  });

  test('заказ сделан', () => {
    const expectedResult = {
      order: {
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
      },
      name: 'Флюоресцентный люминесцентный бургер'
    };
    const action = {
      type: 'orders/newOrder/fulfilled',
      payload: expectedResult
    };
    const newState = orderBurgerSliceReducer(initialOrderBurgerState, action);
    const { order, name, orderRequest } = newState;
    expect(order).toEqual(expectedResult.order);
    expect(name).toBe(expectedResult.name);
    expect(orderRequest).toBe(false);
  });
});
