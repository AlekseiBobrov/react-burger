import { FC } from 'react'
import { Link } from 'react-router-dom'
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
          exact={false}
          text="Лента заказов"
          path="/feed"
          Icon={ListIcon}
        />
      </div>
      <div className={styles.third}>
        <Link to='/'>
          <Logo />
        </Link>
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