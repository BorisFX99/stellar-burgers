import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useAppSelector, useDispatchedActions } from '@store-hooks';
import { userSelectors, userActions } from '@slice/user';
import { Preloader } from '@ui';
import { ErrorMessages, TrequestStatus } from '@utils-types';
import { useLocation } from 'react-router-dom';

export const Profile: FC = () => {
  const location = useLocation();
  const user = useAppSelector(userSelectors.selectUser);
  const { fetchUpdateUser, clearError } = useDispatchedActions(userActions);
  const isLoading = useAppSelector(userSelectors.selectRequestStatus);
  const userError = useAppSelector(userSelectors.selectUserError);
  /** TODO: взять переменную из стора */

  const [formValue, setFormValue] = useState({
    name: user!.name,
    email: user!.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    fetchUpdateUser(formValue);
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user!.name,
      email: user!.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // Очистка ошибки при изменении маршрута
  useEffect(
    () => () => {
      clearError();
    },
    [clearError]
  );

  if (isLoading === TrequestStatus.LOADING) {
    return <Preloader />;
  }

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={userError}
      errorText={ErrorMessages.UPDATE_USER_LOGIN_ERROR}
    />
  );
};
