import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams, useLocation } from 'react-router-dom';
import { feedsSelectors, feedsActions } from '@slice/feeds';
import { ingredientsSelectors } from '@slice/ingredients';
import { useAppSelector, useDispatchedActions } from '@store-hooks';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const orderNumber = Number(number);

  const { fetchOrderByNumber } = useDispatchedActions(feedsActions);
  const selectedOrderByNumber = useAppSelector(
    feedsSelectors.selectOrderByNumber
  );
  const background = useLocation().state?.background;
  const title = !background ? `#0${selectedOrderByNumber?.number}` : '';

  useEffect(() => {
    fetchOrderByNumber(orderNumber);
  }, []);

  /** TODO: взять переменные orderData и ingredients из стора */
  const orderData = selectedOrderByNumber;

  const ingredients: TIngredient[] = useAppSelector(
    ingredientsSelectors.selectAllIngredients
  );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} title={title} />;
};
