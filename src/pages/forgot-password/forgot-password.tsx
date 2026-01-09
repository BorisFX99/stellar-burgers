import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStorageKeys, AppRoutes } from '@utils-types';
import { api } from '@api';
import { ForgotPasswordUI } from '@ui-pages';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState(
    localStorage.getItem(UserStorageKeys.EMAIL) || ''
  );
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setError(null);
    api
      .forgotPasswordApi({ email })
      .then(() => {
        // localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', {
          replace: true,
          state: { from: AppRoutes.ForgotPassword }
        });
      })
      .catch((err) => setError(err));
  };

  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
