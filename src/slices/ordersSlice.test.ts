import ordersReducer from "./ordersSlice";

describe('редьюсер слайса orders', () => {
  const initialState = {
    order: [],
    isLoading: false
  };

  test('лента заказов пользователя загрузилась', () => {
    const expectedResult = [
        {
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
        {
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
        {
          _id: '666c848097ede0001d070b8d',
          ingredients: [
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0945',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный антарианский бургер',
          createdAt: '2024-06-14T17:57:20.269Z',
          updatedAt: '2024-06-14T17:57:20.658Z',
          number: 42460
        }
      ];
    const action = {
      type: 'orders/getOrder/fulfilled',
      payload: expectedResult
    };
    const newState = ordersReducer(initialState, action);
    const { order } = newState;
    expect(order).toEqual(expectedResult);
  });
});
