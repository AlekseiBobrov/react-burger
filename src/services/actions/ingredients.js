import { getIngredientsRequest } from '../../utils/api'; //'../../utils/fake-api' //fakeAPI for test without internet

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsRequest()
      .then(data => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: data
        });
      }
      )
      .catch(err => {
        console.log('getIngredients ERROR:', err);
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      });
  };
}