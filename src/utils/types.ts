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

export type BunType = "top" | "bottom";

export type TabType = 'Булки' | 'Соусы' | 'Начинки';

export interface IngredientState {
  ingredients: null | undefined | IngredientShape[],
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,
}

export interface RootState {
  ingredients: IngredientState,
}

export interface authResponse {
  success: boolean,
  accessToken: string,
  refreshToken: string,
  user: {
    email: string,
    name: string
  }
} 
