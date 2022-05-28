import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientShape } from '../../utils/types'

import styles from './burger-ingredients.module.css';

interface IngredientProps extends IngredientShape {
  count: number,
}

const Ingredient: FC<IngredientProps> = ({count, ...ingredient}) => {
  const location = useLocation();
  const [, dragRef] = useDrag({
      type: "ingredient",
      item: ingredient
  });

  return (
    <Link ref={dragRef}
      className={styles.ingredient}
      to={{
        pathname: `/ingredients/${ingredient._id}`,
        state: { background: location },
      }}
    >
      <div className={"m-5 "}>
        {count?<Counter count={count} size="default" />:null}
        <img src={ingredient.image} alt={`Тут должна быть картинка '${ingredient.name}'`}/>
        <div className={styles.price}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{ingredient.name}</p>
      </div>
    </Link>
  );
}

export default Ingredient;