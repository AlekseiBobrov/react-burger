import { FC } from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import type { IngredientShape, BunType } from '../../utils/types.js'
import styles from './burger-constructor.module.css';

interface BunIngredientProps extends IngredientShape {
  bunType: BunType;
}

const BunIngredient: FC<BunIngredientProps> = ({bunType, ...ingredient}) => {
  const addName = bunType ? (bunType === "top" ? " (верх)" : " (низ)") : "";

  return (
    <div className={styles.ingredient} >
      <svg height={24} width={24} />
      <ConstructorElement
        type={bunType}
        isLocked={true}
        text={ingredient.name + addName}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </div>
  )
}//

export default BunIngredient
