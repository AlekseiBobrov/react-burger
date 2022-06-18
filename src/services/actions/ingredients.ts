import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../constants'

import { getIngredientsRequest } from '../../utils/api'; //'../../utils/fake-api' //fakeAPI for test without internet

import { AppDispatch, IngredientShape } from '../../utils/types';

interface IRequestIngredintsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST
}

interface ISuccessIngredintsAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS
  readonly payload: {
    readonly ingredients: ReadonlyArray<IngredientShape>
  }
}

interface IFailedIngredintsAction {
  readonly type: typeof GET_INGREDIENTS_FAILED
}

export type TIngredientsActions =
  |IRequestIngredintsAction
  |ISuccessIngredintsAction
  |IFailedIngredintsAction;

export const requestIngredientsAction = ():IRequestIngredintsAction =>({
  type: GET_INGREDIENTS_REQUEST
})

export const successIngredientsAction = (ingredients: IngredientShape[]):ISuccessIngredintsAction =>({
  type: GET_INGREDIENTS_SUCCESS,
  payload: {
    ingredients: ingredients
  }
})

export const failedIngredientsAction = ():IFailedIngredintsAction =>({
  type: GET_INGREDIENTS_FAILED
})

export function getIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch( requestIngredientsAction() );

    return getIngredientsRequest()
      .then(data => {
        dispatch( successIngredientsAction(data) );
      })
      .catch(err => {
        console.log('getIngredients ERROR:', err);
        dispatch( failedIngredientsAction() );
      });
  };
}