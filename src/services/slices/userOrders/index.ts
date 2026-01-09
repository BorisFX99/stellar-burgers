import userOrdersSlice from './userOrdersSlice';
import { fetchUserOrders, fetchOrderBurger } from '@thunks';

export const userOrdersActions = {
  ...userOrdersSlice.actions,
  fetchUserOrders,
  fetchOrderBurger
};
export const userOrdersSelectors = userOrdersSlice.selectors;

export { userOrdersSlice };
