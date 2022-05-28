import { FC } from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import MenuItem from './menu-item';
import styles from './app-header.module.css';

const AppHeader: FC = () => {
  return (
    <header className={styles['app-header']} >
      <div className={styles.third}>
        <MenuItem
          text="Конструктор"
          exact={true}
          path="/"
          Icon={BurgerIcon}
        />
        <MenuItem
          exact={true}
          text="Лента заказов"
          path="/orders"
          Icon={ListIcon}
        />
      </div>
      <div className={styles.third}>
        <Logo />
      </div>
      <div className={styles.third}>
        <MenuItem
          exact={false}
          text="Личный кабинет"
          path="/profile"
          Icon={ProfileIcon}
        />
      </div>
    </header>
  );
}

export default AppHeader;