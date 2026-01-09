import { createAppAsyncThunk } from '@store-hooks';
import { USER_SLICE_NAME } from '../slices/sliceNames';
import { TAuthResponse, TLoginData } from 'src/utils/Api/types';
import { setCookie } from 'src/utils/cookie';

export const fetchLoginUser = createAppAsyncThunk<TAuthResponse, TLoginData>(
  `${USER_SLICE_NAME}/fetchLoginUser`,
  async (userInfo: TLoginData, { extra: api }) => {
    const data = await api.loginUserApi(userInfo);
    if (data.success) {
      localStorage.setItem('refreshToken', data.refreshToken);
      setCookie('accessToken', data.accessToken, {
        expires: 7 * 24 * 60 * 60 // на неделю
      });
    }
    return data;
  }
);
