import React from 'react'; //, { Dispatch, SetStateAction }
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';

interface TabsProps {
    current: 'Булки' | 'Соусы' | 'Начинки';
    setCurrent: (text: string) => void;
  }

const Tabs = (props: TabsProps) => {
    return (
      <div className={styles.tabs}>
        <Tab value='Булки' active={props.current === 'Булки'} onClick={props.setCurrent}>
            Булки
        </Tab>
        <Tab value='Соусы' active={props.current === 'Соусы'} onClick={props.setCurrent}>
            Соусы
        </Tab>
        <Tab value='Начинки' active={props.current === 'Начинки'} onClick={props.setCurrent}>
            Начинки
        </Tab>
      </div>
    )
  }

export default Tabs