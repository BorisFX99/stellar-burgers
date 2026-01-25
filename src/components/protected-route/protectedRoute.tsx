import { FC } from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { TProtectedRouteProps } from './type';
import { userSelectors } from '@slice/user';
import { useAppSelector } from '@store-hooks';
import { Preloader } from '@ui';
import { AppRoutes } from '@utils-types';

export const ProtectedRoute: FC<TProtectedRouteProps> = ({ isPublic }) => {
  const location = useLocation();
  const user = useAppSelector(userSelectors.selectUser);
  const isAuthCheck = useAppSelector(userSelectors.selectIsAuthChecked);

  if (!isAuthCheck) {
    return <Preloader />;
  }

  if (isPublic && user) {
    return <Navigate to={location?.state?.from || AppRoutes.Constructor} />;
  }

  if (!isPublic && !user) {
    return <Navigate to={AppRoutes.Login} state={{ from: location }} />;
  }

  return <Outlet />;
};
