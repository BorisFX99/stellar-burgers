import { createAppAsyncThunk } from '@store-hooks';
import { USER_SLICE_NAME } from '../slices/sliceNames';
import { TUserResponse, TRegisterData } from 'src/utils/Api/types';

export const fetchUpdateUser = createAppAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>
>(
  `${USER_SLICE_NAME}/fetchUpdateUser`,
  async (user: Partial<TRegisterData>, { extra: api }) => {
    const data = await api.updateUserApi(user);
    return data;
  }
);
