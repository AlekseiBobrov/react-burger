import LOCALE from './facts-locale.js';
import styles from './ingredient-details.module.css';

interface FactProps {
  name: 'calories' | 'proteins' | 'fat' | 'carbohydrates';
  value: number;
}

const Fact = (props: FactProps) => {
  return (
    <div className={styles.fact}>
      <p className="text text_type_main-default text_color_inactive">{LOCALE[props.name]}</p>
      <p className="text text_type_digits-default text_color_inactive">{props.value}</p>
    </div>
  )
}

export default Fact