import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';

interface TabsProps {
    current: 'Булки' | 'Соусы' | 'Начинки';
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