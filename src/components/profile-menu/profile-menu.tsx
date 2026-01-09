import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI, Preloader } from '@ui';
import { useDispatchedActions, useAppSelector } from '@store-hooks';
import { userSelectors, userActions } from '@slice/user';
import { TrequestStatus } from '@utils-types';
import { deleteCookie } from 'src/utils/cookie';
import { constructorIngredientActions } from '@slice/constructorIngredients';
import { feedsActions } from '@slice/feeds';
import { ingredientsActions } from '@slice/ingredients';
import { userOrdersActions } from '@slice/userOrders';

export const ProfileMenu: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoading = useAppSelector(userSelectors.selectRequestStatus);
  const { fetchlogout } = useDispatchedActions(userActions);
  const { clearConstructor } = useDispatchedActions(
    constructorIngredientActions
  );
  const { clearFeeds } = useDispatchedActions(feedsActions);
  const { clearIngredients, fetchIngredients } =
    useDispatchedActions(ingredientsActions);
  const { clearUser } = useDispatchedActions(userActions);
  const { clearOrders } = useDispatchedActions(userOrdersActions);
  const { setAuthChecked } = useDispatchedActions(userActions);

  const handleLogout = () => {
    fetchlogout()
      .unwrap()
      .then(() => {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        clearConstructor();
        clearFeeds();
        clearIngredients();
        clearUser();
        clearOrders();
      })
      .catch((error) => {
        console.error('Ошибка при выходе:', error);
      })
      .finally(() => {
        setAuthChecked();
        fetchIngredients();
      });
  };

  if (isLoading === TrequestStatus.LOADING) {
    return <Preloader />;
  }

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
