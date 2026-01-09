import { createAppAsyncThunk } from '@store-hooks';
import { USER_SLICE_NAME } from '../slices/sliceNames';
import { TAuthResponse, TRegisterData } from 'src/utils/Api/types';
import { setCookie } from 'src/utils/cookie';

export const fetchRegisterUser = createAppAsyncThunk<
  TAuthResponse,
  TRegisterData
>(
  `${USER_SLICE_NAME}/fetchRegisterUser`,
  async (userInfo: TRegisterData, { extra: api }) => {
    const data = await api.registerUserApi(userInfo);
    if (data.success) {
      localStorage.setItem('refreshToken', data.refreshToken);
      setCookie('accessToken', data.accessToken, {
        expires: 7 * 24 * 60 * 60 // на неделю
      });
    }
    return data;
  }
);
