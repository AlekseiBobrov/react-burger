import React from 'react';
import styles from './burger-ingredients.module.css';
import Ingredient from './ingredient';
import Separator from './separator';
import IngredientDetails from '../ingredient-details/ingredient-details';
import type { IngredientShape } from '../../utils/types.js'

interface BurgerIngredientsProps{
  data: IngredientShape[],
  cart: IngredientShape[],
  setCart: (newCart: IngredientShape[]|[]) => void,
}

const Options = (props: BurgerIngredientsProps) => {
  const [detailsIngredient, setDetailsIngredient] = React.useState({} as IngredientShape);
  const [showDetails, setShowDetails] = React.useState(false);

  const orderFunc = (a:IngredientShape, b:IngredientShape) : number => {
    const ORDER = ['bun', 'sauce', 'main'];
    const index_a = ORDER.indexOf(a.type);
    const index_b = ORDER.indexOf(b.type);
    if (index_a < index_b) { return -1; }
    if (index_a > index_b) { return 1; }
    return 0;
  }

  const addToCart = (newIngredient:IngredientShape) => {
    let newCart = props.cart.slice();
    newCart.push(newIngredient);
    props.setCart(newCart);
  }

  const SEP = [
    {id: 'bun', name: 'Булки'},
    {id: 'sauce', name: 'Соусы'},
    {id: 'main', name: 'Начинки'},
  ]

  const template = Object.fromEntries( Object.entries(props.data[0]).map( ([k, v]) => [k, (typeof v == 'string'?"":0)]) ) as unknown as IngredientShape;
  let options = [ ...props.data ];
  options.sort(orderFunc);

  for (const sep of SEP) {
    const idx = options.findIndex( el => el.type === sep.id );
    options.splice(idx, 0, {...template, _id:sep.id, type:"separator", name:sep.name}); //
  }

  const handelIngredientClick = (id:string) => {
    setDetailsIngredient(props.data.filter(el => el._id === id)[0]);
    setShowDetails(true);
  }

  const hideDetails = () => {
    setShowDetails(false);
    setDetailsIngredient({} as IngredientShape);
  }
    
  return (
    <div className={styles.options}>
      <IngredientDetails isShow={showDetails} ingredient={detailsIngredient} hideDetails={hideDetails}/>
      {options.map( (el, i) =>
        el.type === "separator"?
        <Separator id={el._id} text={el.name} key={i}/>:
        <Ingredient
          id={el._id}
          img={el.image}
          price={el.price}
          name={el.name}
          count={props.cart.filter(cartEl => cartEl._id === el._id).length}
          key={el._id}
          onClick = {handelIngredientClick}
        />
      )}
    </div>
  );
}

export default Options;