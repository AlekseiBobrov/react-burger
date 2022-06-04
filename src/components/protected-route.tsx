import React, { FC } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/types';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuth } = useSelector( (state: RootState) => state.auth );

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