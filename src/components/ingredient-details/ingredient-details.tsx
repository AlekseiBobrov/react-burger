import { FC } from 'react'
import { useSelector } from '../../utils/hooks';
import { useParams } from 'react-router'
import Fact from './fact'

import styles from './ingredient-details.module.css';

interface ParamsType {
  ingredientId: string,
}

const IngredientDetails: FC = () => {
  const { ingredients } = useSelector( state => state.menu );
  const { ingredientId } = useParams<ParamsType>();
  const ingredient = ingredients?.find( el => el._id === ingredientId )
  const NUTRIENTS = ['calories', 'proteins', 'fat', 'carbohydrates'] as const;
  const facts = NUTRIENTS.map( 
    name => (
      <Fact name={name} value={Number(ingredient?.[name])} key={name}/>
    )
  )

  return (
    <>
      <p className={styles.header + " text text_type_main-large"}>Детали ингредиента</p>
      <div className={styles.details}>
        <img src={ingredient?.image_large} alt={`Тут должна быть картинка '${ingredient?.name}'`}/>
        <p className={styles.name + " text text_type_main-medium"}>{ingredient?.name}</p>
        <div className={styles.facts}>
          {facts}
        </div>
      </div>
    </>
  )
}

export default IngredientDetails;