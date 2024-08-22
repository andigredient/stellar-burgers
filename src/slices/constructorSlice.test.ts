import { describe, expect, test } from '@jest/globals';
import constructorReducer, {
  setBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  initialState,
  getConstructorSelector
} from './constructorSlice';
import { TConstructorIngredient } from '../utils/types';

describe('Burger Reducer', () => {
  const testIngredients: TConstructorIngredient[] = [
    {
      _id: '1',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      id: '1'
    },
    {
      _id: '2',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      id: '2'
    }
  ];

  const addingIngredient: TConstructorIngredient = {
    _id: '3',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    id: '3'
  };

  const testBun: TConstructorIngredient = {
    _id: '4',
    name: 'Краторная булка N-300i',
    type: 'bun',
    proteins: 85,
    fat: 25,
    carbohydrates: 55,
    calories: 430,
    price: 1355,
    image: 'https://code.s3.yandex.net/react/code/bun-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-03-large.png',
    id: '4'
  };

  test('adding ingredient', () => {
    const state = {
      ...initialState,
      ingredients: []
    };

    const action = addIngredient(addingIngredient);
    const newState = constructorReducer(state, action);

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toMatchObject({
      _id: addingIngredient._id,
      name: addingIngredient.name,
      type: addingIngredient.type,
      proteins: addingIngredient.proteins,
      fat: addingIngredient.fat,
      carbohydrates: addingIngredient.carbohydrates,
      calories: addingIngredient.calories,
      price: addingIngredient.price,
      image: addingIngredient.image,
      image_mobile: addingIngredient.image_mobile,
      image_large: addingIngredient.image_large,
      id: expect.any(String)
    });
  });

  test('removing ingredient', () => {
    const state = {
      ...initialState,
      ingredients: testIngredients
    };

    const action = removeIngredient('1');
    const newState = constructorReducer(state, action);

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]._id).toBe('2');
  });

  test('setting bun', () => {
    const state = {
      ...initialState,
      ingredients: testIngredients
    };

    const action = setBun(testBun);
    const newState = constructorReducer(state, action);

    expect(newState.bun).toMatchObject({
      _id: testBun._id,
      name: testBun.name,
      type: testBun.type,
      proteins: testBun.proteins,
      fat: testBun.fat,
      carbohydrates: testBun.carbohydrates,
      calories: testBun.calories,
      price: testBun.price,
      image: testBun.image,
      image_mobile: testBun.image_mobile,
      image_large: testBun.image_large,
      id: expect.any(String)
    });
  });

  test('clearing constructor', () => {
    const state = {
      bun: testBun,
      ingredients: testIngredients
    };

    const action = clearConstructor();
    const newState = constructorReducer(state, action);

    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(0);
  });

  test('selecting constructor state', () => {
    const state = {
      burgerConstructor: {
        bun: testBun,
        ingredients: testIngredients
      }
    };

    const constructorState = getConstructorSelector(state);

    expect(constructorState).toEqual({
      bun: testBun,
      ingredients: testIngredients
    });
  });
});
