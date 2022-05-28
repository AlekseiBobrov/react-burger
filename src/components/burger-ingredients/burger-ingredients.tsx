import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Tabs from './tabs'
import Options from './options'
import { SWITCH_TAB, CLICK_TAB } from '../../services/actions'
import styles from './burger-ingredients.module.css';

const BurgerIngredients: FC = () => {
  const { currentTab } = useSelector( (state: any) => state.tab );
  const dispatch = useDispatch();
  
  const setCurrent = (tab:string) => {
    dispatch({
      type: SWITCH_TAB,
      tab
    })
    dispatch({
      type:CLICK_TAB,
      isClick: true,
    })
  }

  return (
    <div className={styles['burger-ingredients']}>
      <p className={"text text_type_main-large " + styles['header']}>Соберите бургер</p>
      <div>
        <Tabs current={currentTab} setCurrent={setCurrent}/>
        <Options />
      </div>
    </div>
  );
}

export default BurgerIngredients;