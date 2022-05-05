import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom';
import styles from './app-header.module.css';
interface MenuItemProps {
  text: string;
  Icon?: React.ComponentType<any>;
  exact: boolean;
  path: string;
}

const MenuItem = ({text, exact, path, Icon}:MenuItemProps) => {
  const match = useRouteMatch({path: path, exact: true});
  const icon_type = match ? "primary" : "secondary";

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