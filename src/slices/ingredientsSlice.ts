import { getIngredientsApi } from '../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../services/store';

import { TIngredient } from '@utils-types';
import type { PayloadAction } from '@reduxjs/toolkit';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

type TIngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isIngredientsLoading: true
};

export const fetchIngredients = createAsyncThunk(
  `ingredients/fetchIngredients`,
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientSelector: (sliceState) => sliceState.ingredients,
    selectisIngredientsLoading: (sliceState) => sliceState.isIngredientsLoading,
    getSelectIngredientId: (state, payload) =>
      state.ingredients.find((i) => i._id === payload.id)
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isIngredientsLoading = false;
      });
  }
});

export const {
  getIngredientSelector,
  selectisIngredientsLoading,
  getSelectIngredientId
} = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
