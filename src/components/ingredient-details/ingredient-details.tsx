import Fact from './fact'
import type { IngredientShape } from '../../utils/types.js'

import styles from './ingredient-details.module.css';

interface IngredientDetailsProps {
  ingredient: IngredientShape,
}

const IngredientDetails = (props: IngredientDetailsProps) => {
  const NUTRIENTS = ['calories', 'proteins', 'fat', 'carbohydrates'] as const;
  const facts = NUTRIENTS.map( 
    name => (
      <Fact name={name} value={Number(props.ingredient[name])} key={name}/>
    )
  )

  return (
    <>
      <p className={styles.header + " text text_type_main-large"}>Детали ингредиента</p>
      <div className={styles.details}>
        <img src={props.ingredient.image_large} alt={`Тут должна быть картинка '${props.ingredient.name}'`}/>
        <p className={styles.name + " text text_type_main-medium"}>{props.ingredient.name}</p>
        <div className={styles.facts}>
          {facts}
        </div>
      </div>
    </>
  )
}

export default IngredientDetails;