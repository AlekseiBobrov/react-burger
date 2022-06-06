import { FC } from 'react'
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';

import styles from './main-page.module.css';

const MainPage: FC = () => {
  return (
    <main className={styles.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  )
}

export default MainPage

