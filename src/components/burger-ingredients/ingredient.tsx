import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from "react-dnd";

import styles from './burger-ingredients.module.css';

interface IngredientProps {
  id: string,
  image: string,
  price: number,
  name: string,
  count: number,
  onClick: (id:string) => void,
}

const Ingredient = ({id, image, price, name, count, onClick}: IngredientProps) => {

  const [, dragRef] = useDrag({
      type: "ingredient",
      item: {id}
  });

  return ( 
    <div className={"m-5 " + styles.ingredient} onClick={() => onClick(id)} ref={dragRef}>
      {count?<Counter count={count} size="default" />:null}
      <img src={image} alt={`Тут должна быть картинка '${name}'`}/>
      <div className={styles.price}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{name}</p>
    </div>
  );
}

export default Ingredient;