import { FC, useMemo, useState } from 'react';
import { useAppSelector, useDispatchedActions } from '@store-hooks';
import { TConstructorIngredient, AppRoutes } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  constructorIngredientActions,
  constructorIngredientSelectors
} from '@slice/constructorIngredients';
import { userSelectors } from '@slice/user';
import { useNavigate, useLocation } from 'react-router-dom';
import { userOrdersSelectors, userOrdersActions } from '@slice/userOrders';
import { createOrderRequestBody } from '@utils';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { fetchOrderBurger, setOrderRequest, removeNewOrder } =
    useDispatchedActions(userOrdersActions); // запрос оформления заказа
  const { clearConstructor } = useDispatchedActions(
    constructorIngredientActions
  ); // очистка конструктора заказа

  const isUserLogin = useAppSelector(userSelectors.selectUser); // залогинен ли юзер
  const constructorItems = useAppSelector(
    constructorIngredientSelectors.selectSelectedIngredients
  );
  const orderRequest = useAppSelector(userOrdersSelectors.selectOrderRequest);
  const newOrder = useAppSelector(userOrdersSelectors.selectNewOrder);
  const orderModalData = newOrder ? newOrder.order : null;
  const [modalOpen, setModalOpen] = useState(false); // переключатель показа модалки

  //Написать логику модлаки заказа и закрытия
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isUserLogin) {
      navigate(AppRoutes.Login, {
        state: { from: location.pathname }
      });
      return;
    }
    const burgerFilling = createOrderRequestBody({
      bun: constructorItems.bun,
      ingredients: constructorItems.ingredients
    });
    fetchOrderBurger(burgerFilling)
      .unwrap()
      .then(() => {
        clearConstructor();
        setModalOpen(true); // показываем когда данные пришли
      });
  };
  const closeOrderModal = () => {
    removeNewOrder();
    setModalOpen(false);
    setOrderRequest(false);
    clearConstructor();
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      isOpen={modalOpen}
    />
  );
};
