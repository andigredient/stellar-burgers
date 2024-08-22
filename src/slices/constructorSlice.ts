import { TConstructorIngredient, TIngredient } from '../utils/types';
import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.bun = action.payload;
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action) => {
      const indexToRemove = state.ingredients.findIndex(
        (i) => i._id === action.payload
      );
      if (indexToRemove !== -1) {
        state.ingredients.splice(indexToRemove, 1);
      }
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructorSelector: (state) => state
  }
});

export default constructorSlice.reducer;

export const constructorReducer = constructorSlice.reducer;

export const { getConstructorSelector } = constructorSlice.selectors;
export const { setBun, addIngredient, removeIngredient, clearConstructor } =
  constructorSlice.actions;
