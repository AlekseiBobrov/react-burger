import styles from './burger-ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

interface IngredientProps {
  id: string,
  img: string,
  price: number,
  name: string,
  count: number,
  onClick: (id:string) => void, //React.MouseEventHandler,
}

const Ingredient = (props: IngredientProps) => {
  return ( 
    <div className={"m-5 " + styles.ingredient} onClick={() => props.onClick(props.id)}>
      {props.count?<Counter count={props.count} size="default" />:null}
      <img src={props.img} alt={`Тут должна быть картинка '${props.name}'`}/>
      <div className={styles.price}>
        <p className="text text_type_digits-default">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{props.name}</p>
    </div>
  );
}

export default Ingredient;