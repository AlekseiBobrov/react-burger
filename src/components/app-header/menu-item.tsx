import { NavLink, useRouteMatch } from 'react-router-dom';
import styles from './app-header.module.css';
import * as Icons from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons'
interface MenuItemProps {
  text: string;
  icon?: "CurrencyIcon" | "BurgerIcon" | "LockIcon" | "DragIcon" | "DeleteIcon" | "ArrowUpIcon" | "ArrowDownIcon" | "MenuIcon" | "CloseIcon" | "CheckMarkIcon" | "ListIcon" | "ProfileIcon";
  exact: boolean;
  path: string;
}

const MenuItem = ({text, exact, path, icon}:MenuItemProps) => {
  const match = useRouteMatch({path: path, exact: true});
  const icon_type = match ? "primary" : "secondary";
  const Icon = icon && Icons[icon];

  return (
    <NavLink
      exact={exact}
      to={path}
      className="text_color_inactive"
      activeClassName="disable-link"
    >
      <div className={styles.menuItem}>
        {Icon && <Icon type={icon_type} /> }
        <p className="m-2 text text_type_main-default">
          {text}
        </p>
      </div>
    </NavLink>
  )
}

export default MenuItem