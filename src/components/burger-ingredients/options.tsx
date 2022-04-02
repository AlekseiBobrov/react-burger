import React from 'react';

import { IngredientsContext } from '../../services/appContext'

import styles from './burger-ingredients.module.css';
import Ingredient from './ingredient';
import Separator from './separator';
import IngredientDetails from '../ingredient-details/ingredient-details';

import type { IngredientShape, CartType } from '../../utils/types.js'
interface BurgerIngredientsProps{
  cart: CartType,
  setCart: (newCart: CartType) => void,
}

type Sections = {
  'bun': React.ReactNode[] | null,
  'sauce': React.ReactNode[] | null,
  'main': React.ReactNode[] | null,
}

const Options = (props: BurgerIngredientsProps) => {
  const { ingredients } = React.useContext(IngredientsContext);
  const [detailsIngredient, setDetailsIngredient] = React.useState<IngredientShape | null>(null);
  const [showDetails, setShowDetails] = React.useState(false);

  const handelIngredientClick = (id: string) => {
    let newIngredient = ingredients ? ingredients.find(el => el._id === id) : null;
    setDetailsIngredient(newIngredient ? newIngredient : null);
    setShowDetails(true);
  }

  const hideDetails = () => {
    setShowDetails(false);
    setDetailsIngredient({} as IngredientShape);
  }

  const sections = { 'bun': null, 'sauce': null, 'main': null } as Sections;
  if (ingredients) {
    Object.keys(sections).forEach(section => {
      sections[section as keyof Sections] = ingredients.filter(el => el.type === section).map((el, i) =>
        <Ingredient
          id={el._id}
          img={el.image}
          price={el.price}
          name={el.name}
          count={[...props.cart.buns, ...props.cart.middle].filter(id => id === el._id).length}
          key={el._id}
          onClick={handelIngredientClick}
        />
      )
    })
  }

  return (
    <div className={styles.options}>
      {detailsIngredient && <IngredientDetails isShow={showDetails} ingredient={detailsIngredient} hideDetails={hideDetails} />}
      <Separator id="bun" text="Булки" />
      {sections['bun']}
      <Separator id="sauce" text="Соусы" />
      {sections['sauce']}
      <Separator id="main" text="Начинки" />
      {sections['main']}
    </div>
  );
}

export default Options;