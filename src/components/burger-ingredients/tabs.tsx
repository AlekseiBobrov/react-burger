import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import type { TabType } from '../../utils/types.js'
import styles from './burger-ingredients.module.css';

interface TabsProps {
    current: TabType;
    setCurrent: (text: string) => void;
  }

const Tabs = ({current, setCurrent}: TabsProps) => {
    return (
      <div className={styles.tabs}>
        <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
            Булки
        </Tab>
        <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
            Соусы
        </Tab>
        <Tab value='Начинки' active={current === 'Начинки'} onClick={setCurrent}>
            Начинки
        </Tab>
      </div>
    )
  }

export default Tabs