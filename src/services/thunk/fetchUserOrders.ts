import { createAppAsyncThunk } from '@store-hooks';
import { USER_ORDERS_SLICE_NAME } from '../slices/sliceNames';
import { TOrder } from '@utils-types';

export const fetchUserOrders = createAppAsyncThunk<TOrder[]>(
  `${USER_ORDERS_SLICE_NAME}/fetchUserOrders`,
  async (_, { extra: api }) => {
    const data = await api.getOrdersApi();
    return data;
  }
);
