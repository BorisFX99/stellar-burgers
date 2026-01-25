import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import {
  Modal,
  OrderInfo,
  IngredientDetails,
  ProtectedRoute,
  ResetPasswordGuard,
  AppHeader
} from '@components';
import '../../index.css';
import styles from './app.module.css';
import { TrequestStatus, AppRoutes } from '@utils-types';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { useDispatchedActions, useAppSelector } from '@store-hooks';
import { userActions, userSelectors } from '@slice/user';
import { ingredientsActions, ingredientsSelectors } from '@slice/ingredients';
import { feedsSelectors } from '@slice/feeds';

const App = () => {
  const { fetchIngredients } = useDispatchedActions(ingredientsActions);
  const { fetchGetUser, setAuthChecked } = useDispatchedActions(userActions);

  const ingredientsRequestStatus = useAppSelector(
    ingredientsSelectors.selectRequestStatus
  );
  const orderNumber = useAppSelector(feedsSelectors.selectOrderNumber);

  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    fetchGetUser()
      .unwrap()
      .catch((err) => console.error('Error:', err))
      .finally(() => setAuthChecked());

    if (ingredientsRequestStatus === TrequestStatus.IDLE) {
      fetchIngredients()
        .unwrap()
        .catch((err) => console.error('Error:', err));
    }
  }, [fetchIngredients, fetchGetUser]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path={AppRoutes.Constructor} element={<ConstructorPage />} />
        <Route path={AppRoutes.Feed} element={<Feed />} />

        {/* модальные окна по прямой ссылке */}
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />

        {/* только для НЕ авторизованных пользователей */}
        <Route element={<ProtectedRoute isPublic />}>
          <Route path={AppRoutes.Login} element={<Login />} />
          <Route path={AppRoutes.Register} element={<Register />} />
          <Route path={AppRoutes.ForgotPassword} element={<ForgotPassword />} />
        </Route>

        {/* только для смены пароля */}
        <Route element={<ResetPasswordGuard />}>
          <Route path={AppRoutes.ResetPassword} element={<ResetPassword />} />
        </Route>

        {/* только для авторизованных пользователей */}
        <Route element={<ProtectedRoute />}>
          <Route path={AppRoutes.Profile} element={<Profile />} />
          <Route path={AppRoutes.ProfileOrders} element={<ProfileOrders />} />
          <Route path={AppRoutes.ProfileOrderInfo} element={<OrderInfo />} />
        </Route>
        <Route path={AppRoutes.NotFound} element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={`#0${orderNumber}`} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title={`#0${orderNumber}`} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
