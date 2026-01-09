import { createAppAsyncThunk } from '@store-hooks';
import { FEEDS_SLICE_NAME } from '../slices/sliceNames';
import { TOrderResponse } from 'src/utils/Api/types';

export const fetchOrderByNumber = createAppAsyncThunk<TOrderResponse, number>(
  `${FEEDS_SLICE_NAME}/fetchOrderByNumber`,
  async (number: number, { extra: api }) => {
    const data = await api.getOrderByNumberApi(number);
    return data;
  }
);
