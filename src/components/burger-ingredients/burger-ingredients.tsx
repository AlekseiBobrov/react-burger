import React from 'react';
import styles from './burger-ingredients.module.css';
import Tabs from './tabs'
import Options from './options'

function BurgerIngredients() {
  const [current_tab, setCurrent] = React.useState('Булки')
  return (
    <div className={styles['burger-ingredients']}>
      <p className={"text text_type_main-large " + styles['header']}>Соберите бургер</p>
      <div>
        <Tabs current={current_tab} setCurrent={setCurrent}/>
        <Options/>
      </div>
    </div>
  );
}

export default BurgerIngredients;