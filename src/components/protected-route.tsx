import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children, ...rest }: RouteProps) {
  const { isAuth } = useSelector( (state:any) => state.auth );

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