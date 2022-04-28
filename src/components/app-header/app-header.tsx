import { NavLink } from 'react-router-dom';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import MenuItem from './menu-item';
import styles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={styles['app-header']} >
      <div className={styles.third}>
      <NavLink exact to="/" className="text_color_inactive" activeClassName="disable-link">
        <MenuItem type={'constructor'} />
      </NavLink>
      <NavLink to="/orders" className="text_color_inactive" activeClassName="disable-link">
        <MenuItem type={'orders'} />
      </NavLink>
      </div>
      <div className={styles.third}>
        <Logo />
      </div>
      <div className={styles.third}>
        <NavLink to="/profile" className="text_color_inactive" activeClassName="disable-link">
          <MenuItem type={'profile'} />
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;