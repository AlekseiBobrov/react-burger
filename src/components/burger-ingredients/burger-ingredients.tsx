import { FC } from 'react'
import { useDispatch, useSelector } from '../../utils/hooks';
import Tabs from './tabs'
import Options from './options'
import { switchTab, clickTab } from '../../services/actions/tab'
import { TabType } from '../../utils/types';
import styles from './burger-ingredients.module.css';

const BurgerIngredients: FC = () => {
  const { currentTab } = useSelector( state => state.tab );
  const dispatch = useDispatch();
  
  const setCurrent = (tab:TabType) => {
    dispatch( switchTab(tab) )
    dispatch( clickTab(true) )
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