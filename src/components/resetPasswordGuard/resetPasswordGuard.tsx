import { FC } from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { AppRoutes } from '@utils-types';

export const ResetPasswordGuard: FC = () => {
  const location = useLocation();
  const isFromFogotPassword = location?.state?.from;

  if (isFromFogotPassword !== AppRoutes.ForgotPassword) {
    return <Navigate to={AppRoutes.ForgotPassword} replace />;
  }

  return <Outlet />;
};
