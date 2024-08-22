import { describe, expect, test } from '@jest/globals';
import userReducer, {
  initialState,
  logout,
  getUser,
  updateUser,
  registerUser,
  loginUser,
  forgotPassord,
  checkUserAuth,
  authChecked,
  setUser
} from './userSlice';
import { TUser } from '@utils-types';
import { Action } from '@reduxjs/toolkit';

describe('userSlice test', () => {
  const mockUser: TUser = {
    email: 'test@test.ru',
    name: 'test'
  };

  test('initial state', () => {
    expect(userReducer(undefined, {} as Action)).toEqual(initialState);
  });

  test('registerUser pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.isAuthChecked).toBe(false);
  });

  test('registerUser fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  test('registerUser rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Ошибка регистрации' }
    };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });

  test('loginUser pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.isAuthChecked).toBe(false);
  });

  test('loginUser fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  test('loginUser rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Ошибка авторизации' }
    };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });

  test('updateUser pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.isAuthChecked).toBe(false);
  });

  test('updateUser fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  test('updateUser rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Ошибка обновления пользователя' }
    };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });

  test('logout pending', () => {
    const action = { type: logout.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  test('logout fulfilled', () => {
    const action = { type: logout.fulfilled.type };
    const state = userReducer({ ...initialState, user: mockUser }, action);
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
  });

  test('logout rejected', () => {
    const action = {
      type: logout.rejected.type,
      error: { message: 'Ошибка выхода' }
    };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });

  test('forgotPassord pending', () => {
    const action = { type: forgotPassord.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  test('forgotPassord fulfilled', () => {
    const action = { type: forgotPassord.fulfilled.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });

  test('forgotPassord rejected', () => {
    const action = {
      type: forgotPassord.rejected.type,
      error: { message: 'Ошибка сброса пароля' }
    };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });

  test('checkUserAuth pending', () => {
    const action = { type: checkUserAuth.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  test('checkUserAuth rejected', () => {
    const action = {
      type: checkUserAuth.rejected.type,
      error: { message: 'Ошибка проверки аутентификации' }
    };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });

  test('authChecked action', () => {
    const action = { type: authChecked.type };
    const state = userReducer(initialState, action);
    expect(state.isAuthChecked).toBe(true);
  });

  test('setUser action', () => {
    const action = {
      type: setUser.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
  });
});
