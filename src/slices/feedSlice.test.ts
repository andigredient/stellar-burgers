import feedSliceReducer from './feedSlice';

describe('редьюсер слайса feed', () => {
  const initialFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isFeedsLoading: false
  };

  test('перед загрузкой ленты', () => {
    const action = {
      type: 'feeds/getFeeds/pending'
    };
    const newState = feedSliceReducer(initialFeedState, action);
    const { isFeedsLoading } = newState;
    expect(isFeedsLoading).toBe(true);
  });

  test('лента загрузилась', () => {
    const expectedResult = {
      orders: [
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
      ],
      total: 3,
      totalToday: 1
    };
    const action = {
      type: 'feeds/getFeeds/fulfilled',
      payload: expectedResult
    };
    const newState = feedSliceReducer(initialFeedState, action);
    const { orders, total, totalToday, isFeedsLoading } = newState;
    expect(orders).toEqual(expectedResult.orders);
    expect(total).toBe(expectedResult.total);
    expect(totalToday).toBe(expectedResult.totalToday);
    expect(isFeedsLoading).toBe(false);
  });
});
