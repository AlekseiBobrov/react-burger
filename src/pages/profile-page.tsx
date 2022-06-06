import { FC } from 'react'
import { useRouteMatch } from 'react-router-dom';
import { ProfileMenu } from '../components/profile-menu';
import { Profile } from '../components/profile';
import { Orders } from '../components/orders'

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