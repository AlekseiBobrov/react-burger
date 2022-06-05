import { FC } from 'react'
import styles from './feed-orders.module.css'

interface IIngredientIconProps {
  img: string;
  count: number;
  zIndex: number;
}

const IngredientIcon: FC<IIngredientIconProps> = ({ img, count, zIndex }) => {
  return (
    <div className={styles.iicon} style={{ zIndex: zIndex }}>
      {count > 1 ? <p className="text text_type_main-default">{`+${count}`}</p> : null}
      <img src={img} />
    </div>
  )
}

export default IngredientIcon