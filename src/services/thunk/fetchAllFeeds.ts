import { createAppAsyncThunk } from '@store-hooks';
import { FEEDS_SLICE_NAME } from '../slices/sliceNames';
import { TFeedsResponse } from 'src/utils/Api/types';

export const fetchAllFeeds = createAppAsyncThunk<TFeedsResponse>(
  `${FEEDS_SLICE_NAME}/fetchAllFeeds`,
  async (_, { extra: api }) => {
    const data = await api.getFeedsApi();
    return data;
  }
);
