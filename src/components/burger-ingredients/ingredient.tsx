import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from "react-dnd";
import { IngredientShape } from '../../utils/types'

import styles from './burger-ingredients.module.css';

interface IngredientProps extends IngredientShape {
  count: number,
  onClick: (id:string) => void,
}

const Ingredient = ({count, onClick, ...ingredient}: IngredientProps) => {

  const [, dragRef] = useDrag({
      type: "ingredient",
      item: ingredient
  });

  return ( 
    <div className={"m-5 " + styles.ingredient} onClick={() => onClick(ingredient._id)} ref={dragRef}>
      {count?<Counter count={count} size="default" />:null}
      <img src={ingredient.image} alt={`Тут должна быть картинка '${ingredient.name}'`}/>
      <div className={styles.price}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  );
}

export default Ingredient;