import { FC, memo, useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '@store-hooks';
import { ingredientsSelectors } from '@slice/ingredients';
import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { feedsSelectors } from '@slice/feeds';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();
  /** TODO: взять переменную из стора */
  const ingredients: TIngredient[] = useAppSelector(
    ingredientsSelectors.selectAllIngredients
  );

  //переменные и для смены стиля нового ордера заказа (5 сек тень)
  const newFeed = useAppSelector(feedsSelectors.selectNewFeeds);
  const [isNewOrder, setIsNewOrder] = useState(false);

  useEffect(() => {
    if (!newFeed) return;
    if (newFeed.some((new_id) => new_id === order._id)) setIsNewOrder(true);
    const timer = setTimeout(() => {
      setIsNewOrder(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [newFeed]);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt);
    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
      isNew={isNewOrder}
    />
  );
});
