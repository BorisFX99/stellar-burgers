import { createAppAsyncThunk } from '@store-hooks';
import { USER_ORDERS_SLICE_NAME } from '../slices/sliceNames';
import { TNewOrderResponse } from 'src/utils/Api/types';

export const fetchOrderBurger = createAppAsyncThunk<
  TNewOrderResponse,
  string[]
>(
  `${USER_ORDERS_SLICE_NAME}/fetchOrderBurger`,
  async (order: string[], { extra: api }) => {
    const data = await api.orderBurgerApi(order);
    return data;
  }
);
