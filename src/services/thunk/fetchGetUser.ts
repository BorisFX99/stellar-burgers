import { createAppAsyncThunk } from '@store-hooks';
import { USER_SLICE_NAME } from '../slices/sliceNames';
import { TUserResponse } from 'src/utils/Api/types';

export const fetchGetUser = createAppAsyncThunk<TUserResponse>(
  `${USER_SLICE_NAME}/fetchGetUser`,
  async (_, { extra: api }) => {
    const data = await api.getUserApi();
    return data;
  }
);
