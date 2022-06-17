import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../constants';

import {
  requestIngredientsAction,
  successIngredientsAction,
  failedIngredientsAction,
  getIngredients
} from '../actions/ingredients'

import {
  initialState,
  ingredientReducer as reducer
} from './ingredients'

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

const ingredients = [bunIngredient, middleIngredient];

describe('Redux menu store', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true, data: ingredients }),
      ok: true
    })
  })

  afterEach(() => {
    jest.restoreAllMocks();
  })

  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  test('Should created GET_INGREDIENTS_REQUEST action', () => {
    const expectedAction = {
      type: GET_INGREDIENTS_REQUEST
    };

    expect(requestIngredientsAction()).toEqual(expectedAction)
  })

  test('Should return state with ingredientsRequest: true', () => {
    const action = requestIngredientsAction();
    const expectedState = { ...initialState, ingredientsRequest: true };

    expect(reducer(initialState, action)).toEqual(expectedState);
  })

  test('Should created GET_INGREDIENTS_FAILED action', () => {
    const expectedAction = {
      type: GET_INGREDIENTS_FAILED
    };

    expect(failedIngredientsAction()).toEqual(expectedAction)
  })

  test('Should return state with ingredientsRequest: false and ingredientsFailed: true', () => {
    const action = failedIngredientsAction();
    const expectedState = { ...initialState, ingredientsRequest: false, ingredientsFailed: true };

    expect(reducer({ ...initialState, ingredientsRequest: true }, action)).toEqual(expectedState);
  })

  test('Should created GET_INGREDIENTS_SUCCESS action with ingredients in payload', () => {
    const expectedAction = {
      type: GET_INGREDIENTS_SUCCESS,
      payload: {
        ingredients: ingredients
      }
    };

    expect(successIngredientsAction(ingredients)).toEqual(expectedAction);
  })

  test('Should return state with passed ingredients in successIngredientsAction and other properties equal false', () => {
    const ingredients = [bunIngredient, middleIngredient];
    const action = successIngredientsAction(ingredients);
    const expectedState = { ...initialState, ingredients: ingredients };

    expect(reducer({ ...initialState, ingredientsRequest: true }, action)).toEqual(expectedState);
  })

  test('Should fired 2 actions after getIngredients is dispatching', () => {
    const middleWares = [thunk];
    const mockStore = configureMockStore(middleWares);
    const store = mockStore(initialState);

    const expectedActions = [
      { type: GET_INGREDIENTS_REQUEST },
      { type: GET_INGREDIENTS_SUCCESS, payload: { ingredients: ingredients } },
    ]

    return store
      .dispatch(getIngredients())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  })

})