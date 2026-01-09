import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '@store-hooks';
import { userSelectors } from '@slice/user';

export const AppHeader: FC = () => {
  const user = useAppSelector(userSelectors.selectUser);
  const userName = user?.name;

  return <AppHeaderUI userName={user ? userName : 'Гость'} />;
};
