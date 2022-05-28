import { FC } from 'react'
import LOCALE from './facts-locale';
import styles from './ingredient-details.module.css';

interface FactProps {
  name: 'calories' | 'proteins' | 'fat' | 'carbohydrates';
  value: number;
}

const Fact: FC<FactProps> = ({name, value}) => {
  return (
    <div className={styles.fact}>
      <p className="text text_type_main-default text_color_inactive">{LOCALE[name]}</p>
      <p className="text text_type_digits-default text_color_inactive">{value}</p>
    </div>
  )
}

export default Fact