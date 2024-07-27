import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';
import {
  TLoginData,
  TRegisterData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../utils/burger-api';
import { TUser } from '@utils-types';

type TUserState = {
  isAuthChecked: boolean;
  user: TUser | null;
};

const initialState: TUserState = {
  isAuthChecked: false,
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    userDataSelector: (state) => state.user
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export default userSlice.reducer;
export const { isAuthCheckedSelector, userDataSelector } = userSlice.selectors;
export const { authChecked, setUser } = userSlice.actions;

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const res = await loginUserApi({ email, password });
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const forgotPassord = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }) => forgotPasswordApi(data)
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((data) => {
          dispatch(setUser(data.user));
        })
        .finally(() => {
          dispatch(authChecked());
        });
    } else {
      dispatch(authChecked());
    }
  }
);
