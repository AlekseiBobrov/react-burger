import { useRouteMatch } from 'react-router-dom';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';
interface MenuItemProps {
  active?: boolean;
  type: "constructor" | "orders" | "profile";
}

const MenuItem = (props: MenuItemProps) => {
  const PATHS = {
    "constructor": "/",
    "orders": "/orders",
    "profile": "/profile",
  }

  const match = useRouteMatch({path:PATHS[props.type], exact:true});
  const icon_type = match ? "primary" : "secondary";

  let icon: JSX.Element;
  let text: string;
  switch (props.type) {
    case 'constructor':
      icon = <BurgerIcon type={icon_type} />;
      text = "Конструктор";
      break;
    case 'orders':
      icon = <ListIcon type={icon_type} />;
      text = "Лента заказов";
      break;
    case 'profile':
      icon = <ProfileIcon type={icon_type} />;
      text = "Личный кабинет";
      break;
  };

  return (
    <div className={styles.menuItem}>
      {icon}
      <p className="m-2 text text_type_main-default">
        {text}
      </p>
    </div>
  )
}

export default MenuItem