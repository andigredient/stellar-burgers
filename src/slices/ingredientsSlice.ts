import { getIngredientsApi } from '../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';

type TIngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isIngredientsLoading: true
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
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

export const getIngredientSelector = (state: RootState): TIngredient[] =>
  state.ingredients.ingredients;
export const selectIsIngredientsLoading = (state: {
  ingredients: TIngredientsState;
}) => state.ingredients.isIngredientsLoading;
export const getSelectIngredientId = (state: RootState, id?: string) =>
  id ? state.ingredients.ingredients.find((i) => i._id === id) : undefined;

export default ingredientsSlice.reducer;
