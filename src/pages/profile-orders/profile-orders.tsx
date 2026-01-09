import { ProfileOrdersUI } from '@ui-pages';
import { TOrder, TrequestStatus } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatchedActions, useAppSelector } from '@store-hooks';
import { userOrdersActions, userOrdersSelectors } from '@slice/userOrders';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const { fetchUserOrders } = useDispatchedActions(userOrdersActions);
  const isLoading = useAppSelector(userOrdersSelectors.selectRequestStatus);
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useAppSelector(
    userOrdersSelectors.selectAllUserOrders
  );

  useEffect(() => {
    fetchUserOrders();
  }, []);

  if (isLoading === TrequestStatus.LOADING) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
