import styles from './ingredient-details.module.css';
import type { FactNameType } from '../../utils/types.js'

interface FactProps {
  name: FactNameType;
  value: number;
}

const Fact = (props: FactProps) => {
  const LOCALE = {
    'calories': 'Калории, ккал',
    'proteins': 'Белки, г',
    'fat': 'Жиры, г',
    'carbohydrates': 'Углеводы, г',
  }
  return (
    <div className={styles.fact}>
      <p className="text text_type_main-default text_color_inactive">{LOCALE[props.name]}</p>
      <p className="text text_type_digits-default text_color_inactive">{props.value}</p>
    </div>
  )
}

export default Fact