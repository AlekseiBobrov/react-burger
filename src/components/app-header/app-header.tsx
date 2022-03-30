import styles from './app-header.module.css';
import MenuItem from './menu-item';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {
  return (
    <header className={styles['app-header']} >
      <div className={styles.third}>
        <MenuItem type={'constructor'} active={true} />
        <MenuItem type={'feed'} active={false} />
      </div>
      <div className={styles.third}>
        <Logo />
      </div>
      <div className={styles.third}>
        <MenuItem type={'profile'} active={false} />
      </div>
    </header>
  );
}

export default AppHeader;