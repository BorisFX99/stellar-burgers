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
  userErrorMessage: string | null;
  error: string | null;
}

export const initialState: IUserState = {
  user: null,
  requestStatus: TrequestStatus.IDLE,
  isAuthChecked: false,
  userErrorMessage: null,
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
      state.userErrorMessage = null;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectUserError: (state) => state.userErrorMessage,
    selectRequestStatus: (state) => state.requestStatus
  },
  extraReducers: (builder) => {
    builder
      // Обработка fullfiled разлогина
      .addCase(fetchlogout.fulfilled, (state) => {
        state.requestStatus = TrequestStatus.IDLE;
        state.user = null;
        state.error = null;
        state.userErrorMessage = null;
      })
      // Обработка ошибки из формы Логина
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.requestStatus = TrequestStatus.ERROR;
        if (action.error?.message) {
          state.userErrorMessage = ErrorMessages.FORM_SUBMIT_LOGIN;
          state.error = action.error?.message;
        }
      })
      // Обработка ошибки из формы Регистрации
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.requestStatus = TrequestStatus.ERROR;
        if (action.error.message) {
          state.userErrorMessage = ErrorMessages.FORM_SUBMIT_REGISTER;
          state.error = action.error?.message;
        }
      })

      // Обработка ошибки из формы Обновления данных пользователя
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.requestStatus = TrequestStatus.ERROR;
        if (action.error.message) {
          state.userErrorMessage = ErrorMessages.UPDATE_USER_SUBMIT_ERROR;
          state.error = action.error?.message;
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
          state.isAuthChecked = true;
          state.error = null;
          state.userErrorMessage = null;
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
          state.userErrorMessage = null;
          const { success, user } = action.payload;
          if (success && user) {
            state.user = user;
          } else {
            state.user = null;
          }
        }
      )
      // Общая обработка для всех остальных rejected
      .addMatcher(
        isAnyOf(fetchGetUser.rejected, fetchlogout.rejected),
        (state, action) => {
          state.requestStatus = TrequestStatus.ERROR;
          if (action.error.message) {
            state.error = action.error?.message;
          }
        }
      );
  }
});

export default userSlice;
