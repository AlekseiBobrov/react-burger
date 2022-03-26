import React from 'react';
import styles from './app-header.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

interface MenuItemProps {
  active: boolean;
  type: "constructor" | "feed" | "profile";
}

function MenuItem(props: MenuItemProps) {
  const icon_type = props.active ? "primary" : "secondary";
  let icon: JSX.Element;
  let text: string;
  switch (props.type){
    case 'constructor':
      icon = <BurgerIcon type={icon_type} />;
      text = "Конструктор";
      break;
    case 'feed':
      icon = <ListIcon type={icon_type} />;
      text = "Лента заказов";
      break;
    case 'profile':
      icon = <ProfileIcon type={icon_type}/>;
      text = "Личный кабинет";
      break;
  };

  return (
    <div className={styles.menuItem}> 
      { icon }
      <p className={"m-2 text text_type_main-default" + (props.active ? "" : " text_color_inactive")}>
        { text }
      </p>
    </div>
  )
}

export default MenuItem