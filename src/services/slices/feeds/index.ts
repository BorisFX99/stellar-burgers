import feedsSlice from './feedsSlice';
import { fetchAllFeeds, fetchOrderByNumber } from '@thunks';

export const feedsActions = {
  ...feedsSlice.actions,
  fetchAllFeeds,
  fetchOrderByNumber
};
export const feedsSelectors = feedsSlice.selectors;

export { feedsSlice };
