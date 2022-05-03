import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import MenuItem from './menu-item';
import styles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={styles['app-header']} >
      <div className={styles.third}>
        <MenuItem
          text="Конструктор"
          path="/"
          icon="BurgerIcon"
        />
        <MenuItem
          text="Лента заказов"
          path="/orders"
          icon="ListIcon"
        />
      </div>
      <div className={styles.third}>
        <Logo />
      </div>
      <div className={styles.third}>
        <MenuItem 
          text="Личный кабинет"
          path="/profile"
          icon="ProfileIcon"
        />
      </div>
    </header>
  );
}

export default AppHeader;