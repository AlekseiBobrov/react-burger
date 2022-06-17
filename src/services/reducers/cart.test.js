import { ADD_INGREDIENT, REMOVE_INGREDIENT, UPDATE_CART, DROP_CART } from '../constants'
import { addIngredient, removeIngredient, updateCart, dropCart } from '../actions/cart'
import { initialState, cartReducer as reducer } from './cart'

const bunIngredient = {
  "_id": "60666c42cc7b410027a1a9b1",
  "name": "Краторная булка N-200i",
  "type": "bun",
  "proteins": 80,
  "fat": 24,
  "carbohydrates": 53,
  "calories": 420,
  "price": 1255,
  "image": "https://code.s3.yandex.net/react/code/bun-02.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
  "__v": 0
};

const middleIngredient = {
  "_id": "60666c42cc7b410027a1a9b5",
  "name": "Говяжий метеорит (отбивная)",
  "type": "main",
  "proteins": 800,
  "fat": 800,
  "carbohydrates": 300,
  "calories": 2674,
  "price": 3000,
  "image": "https://code.s3.yandex.net/react/code/meat-04.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
  "__v": 0
};

describe('Redux cart store', () => {

  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  test('Should created ADD_INGREDIENT action with ingredient with uuid in payload', () => {
    const action = addIngredient(bunIngredient);
    const { uuid } = action.payload.ingredient

    const expectedAction = {
      type: ADD_INGREDIENT,
      payload: {
        ingredient: { ...bunIngredient, uuid: uuid }
      }
    };

    expect(action.payload.ingredient).toHaveProperty('uuid');
    expect(action).toEqual(expectedAction);
  })

  test('Should return state with passed ingredient bun or middle in addIngredient', () => {
    const actionBun = addIngredient(bunIngredient);
    const actionMiddle = addIngredient(middleIngredient);

    const uuidBun = actionBun.payload.ingredient.uuid;
    const uuidMiddle = actionMiddle.payload.ingredient.uuid;

    const expectedStateBun = { ...initialState, buns: [{ ...bunIngredient, uuid: uuidBun }, { ...bunIngredient, uuid: uuidBun }] };
    const expectedStateMiddle = { ...initialState, middle: [{ ...middleIngredient, uuid: uuidMiddle }] };

    expect(reducer(initialState, actionBun)).toEqual(expectedStateBun);
    expect(reducer(initialState, actionMiddle)).toEqual(expectedStateMiddle);
  })

  test('Should created REMOVE_INGREDIENT action with passed ingredient & orderIndex in payload', () => {
    const ingredient = { ...middleIngredient, uuid: "000001" };
    const orderIndex = 0;

    const expectedAction = {
      type: REMOVE_INGREDIENT,
      payload: {
        ingredient: ingredient,
        orderIndex: orderIndex,
      }
    };

    expect(removeIngredient(ingredient, orderIndex)).toEqual(expectedAction)
  })

  test('Should return state without passed ingredient in removeIngredient', () => {
    const orderIndex = 0;
    const action = removeIngredient(middleIngredient, orderIndex)
    const state = { buns: [], middle: [middleIngredient] }

    expect(reducer(state, action)).toEqual(initialState);
  })

  test('Should created UPDATE_CART action with new middle in payload', () => {
    const newMiddle = [middleIngredient];
    const expectedAction = {
      type: UPDATE_CART,
      payload: {
        middle: newMiddle
      }
    };

    expect(updateCart(newMiddle)).toEqual(expectedAction);
  })

  test('Should return state with passed middle in updateCart', () => {
    const ingredient1 = { ...middleIngredient, uuid: "000001" };
    const ingredient2 = { ...middleIngredient, uuid: "000002" };
    const middle = [ingredient1, ingredient2];
    const newMiddle = [ingredient2, ingredient1];
    const action = updateCart(newMiddle);
    const expectedState = { ...initialState, middle: newMiddle };

    expect(reducer({ ...initialState, middle: middle }, action)).toEqual(expectedState);
  })

  test('Should created DROP_CART action', () => {
    const expectedAction = {
      type: DROP_CART
    };

    expect(dropCart()).toEqual(expectedAction)
  })

  test('Should return empty cart (intialState) after dropCart', () => {
    const action = dropCart();
    const state = {
      buns: [bunIngredient, bunIngredient],
      middle: [middleIngredient]
    };

    expect(reducer(state, action)).toEqual(initialState);
  })

})