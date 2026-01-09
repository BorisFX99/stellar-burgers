import { FC, SyntheticEvent, useState, useRef, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { userActions, userSelectors } from '@slice/user';
import { useAppSelector, useDispatchedActions } from '@store-hooks';
import { UserStorageKeys, TrequestStatus } from '@utils-types';
import { useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { easyValidInputs } from '@utils';

export const Register: FC = () => {
  const location = useLocation();
  const userNameRef = useRef<string>('');
  const emailRef = useRef<string>('');

  const [userName, setUserName] = useState(
    localStorage.getItem(UserStorageKeys.NAME) || ''
  );
  const [email, setEmail] = useState(
    localStorage.getItem(UserStorageKeys.EMAIL) || ''
  );
  const [password, setPassword] = useState('');
  const [inputErr, setInputErr] = useState({
    emailErr: false,
    userNameErr: false
  });

  const error = useAppSelector(userSelectors.selectUserError);
  const isLoading = useAppSelector(userSelectors.selectRequestStatus);
  const { fetchRegisterUser, clearError } = useDispatchedActions(userActions);

  const { isPasswordValid, isEmailValid, inputErrorsMsg, isUserNameValid } =
    easyValidInputs({ password, email, userName });

  // переключатель disable для кнопки submit
  const disabledButton = !userName || !email || !password;

  // логика удалиеня показа ошибки при начале ввода в поля формы
  useEffect(() => {
    if (email !== '') setInputErr((prev) => ({ ...prev, emailErr: false }));
    if (userName !== '')
      setInputErr((prev) => ({ ...prev, userNameErr: false }));
    if (error && (password || emailRef.current !== email)) {
      clearError();
    }
  }, [password, email]);

  // Очистка ошибки при изменении маршрута (между формами очищается)
  useEffect(() => {
    clearError();
  }, [location.pathname]);

  // Обработка Submit
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isEmailValid || !isUserNameValid || !isPasswordValid) {
      setInputErr((prev) => ({ ...prev, userNameErr: !isUserNameValid }));
      setInputErr((prev) => ({ ...prev, emailErr: !isEmailValid }));
      return;
    }
    emailRef.current = email;
    userNameRef.current = userName;
    fetchRegisterUser({
      email: email,
      password: password,
      name: userName
    })
      .unwrap()
      .then(() => {
        localStorage.removeItem(UserStorageKeys.NAME);
        localStorage.removeItem(UserStorageKeys.EMAIL);
      })
      .catch((err) => {
        localStorage.setItem(UserStorageKeys.NAME, userName);
        localStorage.setItem(UserStorageKeys.EMAIL, email);
        console.error(err);
      })
      .finally(() => setPassword(''));
  };

  if (isLoading === TrequestStatus.LOADING) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={error ? error : ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
      submitDisabled={disabledButton}
      inputErr={inputErr}
      inputErrMsg={inputErrorsMsg}
    />
  );
};
