import userReducer, { authChecked, setUser } from './userSlice';

describe('редьюсер слайса user', () => {
  const initialState = {
    isAuthChecked: false,
    user: null,
    isLoading: false
  };

  test('проверка аутентификации', () => {
    const newState = userReducer(initialState, authChecked());
    const { isAuthChecked } = newState;
    expect(isAuthChecked).toBe(true);
  });

  test('установка пользователя', () => {
    const expectedResult = {
      name: 'Name',
      email: 'example@mail.ru'
    };
    const newState = userReducer(
        initialState,
      setUser(expectedResult)
    );
    const { user } = newState;
    expect(user).toEqual(expectedResult);
  });

  test('регистрация пользователя', () => {
    const expectedResult = {
      name: 'Name',
      email: 'example@mail.ru'
    };
    const action = {
      type: 'user/registerUser/fulfilled',
      payload: expectedResult
    };
    const newState = userReducer(initialState, action);
    const { user } = newState;
    expect(user).toEqual(expectedResult);
  });

  test('вход пользователя', () => {
    const expectedResult = {
      name: 'Name',
      email: 'example@mail.ru'
    };
    const action = {
      type: 'user/loginUser/fulfilled',
      payload: expectedResult
    };
    const newState = userReducer(initialState, action);
    const { user } = newState;
    expect(user).toEqual(expectedResult);
  });

  test('обновление данных пользователя', () => {
    const expectedResult = {
      name: 'Name',
      email: 'example@mail.ru'
    };
    const action = {
      type: 'user/updateUser/fulfilled',
      payload: { user: expectedResult, success: true }
    };
    const newState = userReducer(initialState, action);
    const { user } = newState;
    expect(user).toEqual(expectedResult);
  });

  test('выход пользователя', () => {
    const action = {
      type: 'user/logout/fulfilled'
    };
    const newState = userReducer(initialState, action);
    const { user } = newState;
    expect(user).toBe(null);
  });
});
