import React from 'react';
import type { IngredientShape } from '../utils/types.js'

interface IngredientsContextType {
    ingredients: IngredientShape[] | null,
    setIngredients?:  React.Dispatch<React.SetStateAction<null>>|React.Dispatch<React.SetStateAction<IngredientShape[]>>,
}

export const IngredientsContext = React.createContext<IngredientsContextType>({ingredients: null}); 