import ReactDOM from 'react-dom';
import styles from './ingredient-details.module.css';

import Modal from '../modal/modal'
import ModalOverlay from '../modal/modal-overlay'
import Fact from './fact'
import type { IngredientShape,  FactNameType } from '../../utils/types.js'

interface IngredientDetailsProps {
  ingredient: IngredientShape,
  isShow: boolean,
  hideDetails: () => void,
}

const IngredientDetails = (props: IngredientDetailsProps) => {
  const facts = ['calories', 'proteins', 'fat', 'carbohydrates'].map( 
    name => (
      <Fact name={name as FactNameType} value={Number(props.ingredient[name as keyof IngredientShape])} key={name}/>
    )
  )
  const modal = (
    <ModalOverlay closeModal={props.hideDetails}>
      <Modal closeModal={props.hideDetails} width={640} height={540}>
        <p className={styles.header + " text text_type_main-large"}>Детали ингредиента</p>
        <div className={styles.details}>
          <img src={props.ingredient.image_large} alt={`Тут должна быть картинка '${props.ingredient.name}'`}/>
          <p className={styles.name + " text text_type_main-medium"}>{props.ingredient.name}</p>
          <div className={styles.facts}>
            {facts}
          </div>
        </div>
        
      </Modal>
    </ModalOverlay>
  )
  return props.isShow ? ReactDOM.createPortal(modal, document.body) : null;
}

export default IngredientDetails;