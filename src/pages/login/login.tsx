import { FC, SyntheticEvent, useState, useEffect, useRef } from 'react';
import { LoginUI } from '@ui-pages';
import { userActions, userSelectors } from '@slice/user';
import { useAppSelector, useDispatchedActions } from '@store-hooks';
import { UserStorageKeys, TrequestStatus } from '@utils-types';
import { useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { easyValidInputs } from '@utils';

export const Login: FC = () => {
  const location = useLocation();
  const emailRef = useRef<string>('');

  const [email, setEmail] = useState(
    localStorage.getItem(UserStorageKeys.EMAIL) || ''
  );
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState(false);

  const error = useAppSelector(userSelectors.selectUserError);
  const isLoading = useAppSelector(userSelectors.selectRequestStatus);
  const { fetchLoginUser, clearError } = useDispatchedActions(userActions);

  const { isPasswordValid, isEmailValid, inputEmailMsg } = easyValidInputs({
    password,
    email
  });

  // переключатель disable для кнопки submit
  const disabledButton = !email || !password;

  // логика удаления показа ошибки при вводе в поля
  useEffect(() => {
    if (email !== '') setEmailErr(false);
    if (error && (password || emailRef.current !== email)) {
      clearError();
    }
  }, [password, email]);

  // Очистка ошибки при изменении маршрута
  useEffect(() => {
    clearError();
  }, [location.pathname]);

  // Обработка Submit
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isEmailValid || !isPasswordValid) {
      setEmailErr(!isEmailValid);
      return;
    }
    emailRef.current = email;
    fetchLoginUser({
      email: email,
      password: password
    })
      .unwrap()
      .then(() => {
        localStorage.removeItem(UserStorageKeys.EMAIL);
      })
      .catch((err) => {
        localStorage.setItem(UserStorageKeys.EMAIL, email);
        console.error(err);
      })
      .finally(() => setPassword(''));
  };

  if (isLoading === TrequestStatus.LOADING) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error ? error : ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      submitDisabled={disabledButton}
      emailErr={emailErr}
      inputErrMsg={inputEmailMsg}
    />
  );
};
