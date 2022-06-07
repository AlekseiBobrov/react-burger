import { FC } from 'react'
import { makeLogout } from '../../services/actions/auth';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useDispatch } from '../../utils/hooks';

import styles from './profile-menu.module.css'

const ProfileMenu: FC = () => {
  const isOrders = useRouteMatch({ path: '/profile/orders', exact: false });
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(makeLogout());
  }

  return (
    <div className={styles.side}>
      <NavLink exact to="/profile" className="text text_type_main-medium text_color_inactive" activeClassName="disable-link">Профиль</NavLink>
      <NavLink to="/profile/orders" className="text text_type_main-medium text_color_inactive" activeClassName="disable-link">История заказов</NavLink>
      <p className={`text text_type_main-medium text_color_inactive ${styles.clickable}`} onClick={handleLogoutClick}>Выйти</p>
      <p className={`text text_type_main-default text_color_inactive ${styles.bottom}`}>
        В этом разделе вы можете<br />{isOrders ? 'просмотреть свою историю заказов' : 'изменить свои персональные данные'}
      </p>
    </div>
  )
}

export default ProfileMenu
