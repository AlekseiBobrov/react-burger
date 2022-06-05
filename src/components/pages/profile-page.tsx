import { FC } from 'react'
import { useRouteMatch } from 'react-router-dom';
import { ProfileMenu } from '../profile-menu';
import { Profile } from '../profile';
import { Orders } from '../orders'

const ProfilePage: FC = () => {
  const isOrders = useRouteMatch({ path: '/profile/orders', exact: false });

  return (
    <div className="page">
      <ProfileMenu />
      {isOrders ? <Orders /> : <Profile />}
    </div>
  );
}

export default ProfilePage;