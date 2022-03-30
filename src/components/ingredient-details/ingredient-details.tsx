import styles from './ingredient-details.module.css';

import Modal from '../modal/modal'
import Fact from './fact'
import type { IngredientShape } from '../../utils/types.js'

interface IngredientDetailsProps {
  ingredient: IngredientShape,
  isShow: boolean,
  hideDetails: () => void,
}

const IngredientDetails = (props: IngredientDetailsProps) => {
  const NUTRIENTS = ['calories', 'proteins', 'fat', 'carbohydrates'] as const;
  const facts = NUTRIENTS.map( 
    name => (
      <Fact name={name} value={Number(props.ingredient[name])} key={name}/>
    )
  )

  return (
    <Modal isShow={props.isShow} closeModal={props.hideDetails} className={styles["ingredient-details"]}>
      <p className={styles.header + " text text_type_main-large"}>Детали ингредиента</p>
      <div className={styles.details}>
        <img src={props.ingredient.image_large} alt={`Тут должна быть картинка '${props.ingredient.name}'`}/>
        <p className={styles.name + " text text_type_main-medium"}>{props.ingredient.name}</p>
        <div className={styles.facts}>
          {facts}
        </div>
      </div>
    </Modal>
  )
}

export default IngredientDetails;