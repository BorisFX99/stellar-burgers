import { createAppAsyncThunk } from '@store-hooks';
import { USER_SLICE_NAME } from '../slices/sliceNames';
import { TServerResponse } from 'src/utils/Api/types';

export const fetchlogout = createAppAsyncThunk<TServerResponse<{}>>(
  `${USER_SLICE_NAME}/fetchlogout`,
  async (_, { extra: api }) => {
    const data = await api.logoutApi();
    return data;
  }
);
