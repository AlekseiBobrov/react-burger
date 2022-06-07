import React, { FC } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from '../utils/hooks'

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuth } = useSelector( state => state.auth );

  return (
    <Route
      {...rest}
      render={({ location }) => isAuth ? (
        children
      ) : <Redirect to={{
          pathname: '/login',
          state: { from: location }
        }} />
      }
    />
  );
}