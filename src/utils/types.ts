export interface IngredientShape {
  "_id": string,
  "name": string,
  "type": string,
  "proteins": number,
  "fat": number,
  "carbohydrates": number,
  "calories": number,
  "price": number,
  "image": string,
  "image_mobile": string,
  "image_large": string,
  "__v": number
}

export interface CartIngredient extends IngredientShape {
  uuid: string;
}
export interface CartType {
  buns: CartIngredient[],
  middle: CartIngredient[], 
}

export interface IngredientState {
  ingredients: null | undefined | IngredientShape[],
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,
}

export interface RootState {
  ingredients: IngredientState,
}