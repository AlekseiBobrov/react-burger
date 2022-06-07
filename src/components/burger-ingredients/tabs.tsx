import { FC } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import type { TabType } from '../../utils/types.js'
import styles from './burger-ingredients.module.css';

interface TabsProps {
  current: TabType;
  setCurrent: (tab: TabType) => void;
}

const Tabs: FC<TabsProps> = ({ current, setCurrent }) => {
  return (
    <div className={styles.tabs}>
      {/*@ts-expect-error: Типизированная функция onClick(string) компонента Tab*/}
      <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
        Булки
      </Tab>
      {/*@ts-expect-error: Типизированная функция onClick(string) компонента Tab*/}
      <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
        Соусы
      </Tab>
      {/*@ts-expect-error: Типизированная функция onClick(string) компонента Tab*/}
      <Tab value='Начинки' active={current === 'Начинки'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

export default Tabs