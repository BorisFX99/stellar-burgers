import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import { TrequestStatus, TUser, ErrorMessages } from '@utils-types';
import { TUserResponse, TAuthResponse } from 'src/utils/Api/types';
import { USER_SLICE_NAME } from '../sliceNames';
import {
  fetchGetUser,
  fetchLoginUser,
  fetchRegisterUser,
  fetchUpdateUser,
  fetchlogout
} from '@thunks';

export interface IUserState {
  user: TUser | null;
  requestStatus: TrequestStatus;
  isAuthChecked: boolean;
  error: string | null;
}

const initialState: IUserState = {
  user: null,
  requestStatus: TrequestStatus.IDLE,
  isAuthChecked: false,
  error: null
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.requestStatus = TrequestStatus.IDLE;
      state.isAuthChecked = false;
      state.error = null;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectUserError: (state) => state.error,
    selectRequestStatus: (state) => state.requestStatus
  },
  extraReducers: (builder) => {
    builder
      // Обработка fullfiled разлогина
      .addCase(fetchlogout.fulfilled, (state) => {
        state.requestStatus = TrequestStatus.SUCCESS;
      })
      // Обработка ошибки из формы Логина
      .addCase(fetchLoginUser.rejected, (state, action) => {
        if (action.error?.message) {
          state.error = ErrorMessages.FORM_SUBMIT_LOGIN;
        }
      })
      // Обработка ошибки из формы Регистрации
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        if (action.error?.message) {
          state.error = ErrorMessages.FORM_SUBMIT_REGISTER;
        }
      })
      // Общая обработка для всех pending thunk
      .addMatcher(
        isAnyOf(
          fetchGetUser.pending,
          fetchLoginUser.pending,
          fetchRegisterUser.pending,
          fetchUpdateUser.pending,
          fetchlogout.pending
        ),
        (state) => {
          state.requestStatus = TrequestStatus.LOADING;
          state.error = null;
        }
      )
      // Общая обработка для fulfilled Идентификации и Обновления данных пользователя
      .addMatcher(
        isAnyOf(fetchGetUser.fulfilled, fetchUpdateUser.fulfilled),
        (state, action: PayloadAction<TUserResponse>) => {
          state.requestStatus = TrequestStatus.SUCCESS;
          state.error = null;
          const { success, user } = action.payload;
          if (success && user) {
            state.user = user;
          } else {
            state.user = null;
          }
        }
      )
      // Общая обработка для fulfilled Логина и Регистрации
      .addMatcher(
        isAnyOf(fetchLoginUser.fulfilled, fetchRegisterUser.fulfilled),
        (state, action: PayloadAction<TAuthResponse>) => {
          state.requestStatus = TrequestStatus.SUCCESS;
          state.error = null;
          const { success, user } = action.payload;
          if (success && user) {
            state.user = user;
          } else {
            state.user = null;
          }
        }
      )
      // Общая обработка для всех rejected
      .addMatcher(
        isAnyOf(
          fetchGetUser.rejected,
          fetchLoginUser.rejected,
          fetchRegisterUser.rejected,
          fetchUpdateUser.rejected,
          fetchlogout.rejected
        ),
        (state) => {
          state.requestStatus = TrequestStatus.ERROR;
        }
      );
  }
});

export default userSlice;
