import React from 'react';
import styles from './burger-ingredients.module.css';
import Ingredient from './ingredient';
import Separator from './separator';
import IngredientDetails from '../ingredient-details/ingredient-details';
import type { IngredientShape } from '../../utils/types.js'

interface BurgerIngredientsProps {
  data: IngredientShape[],
  cart: IngredientShape[],
  setCart: (newCart: IngredientShape[]) => void,
}

type Sections = {
  'bun': React.ReactNode[] | null,
  'sauce': React.ReactNode[] | null,
  'main': React.ReactNode[] | null,
}

const Options = (props: BurgerIngredientsProps) => {
  const [detailsIngredient, setDetailsIngredient] = React.useState<IngredientShape | null>(null);
  const [showDetails, setShowDetails] = React.useState(false);

  const handelIngredientClick = (id: string) => {
    let newIngredient = props.data.find(el => el._id === id);
    setDetailsIngredient(newIngredient ? newIngredient : null);
    setShowDetails(true);
  }

  const hideDetails = () => {
    setShowDetails(false);
    setDetailsIngredient({} as IngredientShape);
  }

  const sections = { 'bun': null, 'sauce': null, 'main': null } as Sections;
  Object.keys(sections).forEach(section => {
    sections[section as keyof Sections] = props.data.filter(el => el.type === section).map((el, i) =>
      <Ingredient
        id={el._id}
        img={el.image}
        price={el.price}
        name={el.name}
        count={props.cart.filter(cartEl => cartEl._id === el._id).length}
        key={el._id}
        onClick={handelIngredientClick}
      />
    )
  }
  )

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