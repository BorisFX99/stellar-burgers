import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder, TrequestStatus } from '@utils-types';
import { FC, useEffect, useCallback } from 'react';
import { useDispatchedActions, useAppSelector } from '@store-hooks';
import { feedsActions, feedsSelectors } from '@slice/feeds';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { fetchAllFeeds } = useDispatchedActions(feedsActions);
  const requestStatus = useAppSelector(feedsSelectors.selectRequestStatus);

  useEffect(() => {
    fetchAllFeeds();
  }, []);

  const handleGetFeeds = useCallback(() => {
    fetchAllFeeds();
  }, [fetchAllFeeds]);

  const orders: TOrder[] = useAppSelector(feedsSelectors.selectAllOrders);

  if (requestStatus === TrequestStatus.LOADING) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
