import { initialState } from './userSlice';
import { userSlice } from '@slices';
import { userActions } from '@slice/user';
import { ErrorMessages, TrequestStatus } from '@utils-types';
import {
  getUserSuccessMock,
  userRejectMock,
  loginMock,
  registerUserMock,
  updateUserMock,
  userMock
} from '@mocks';

const {
  fetchGetUser,
  fetchLoginUser,
  fetchRegisterUser,
  fetchUpdateUser,
  fetchlogout
} = userActions;

describe('userSlice reducer ', () => {
  const initialStateIsAuth = {
    ...initialState,
    isAuthChecked: true
  };

  //Authentication User
  describe('fetchGetUser', () => {
    it('fetchGetUser fullfiled', () => {
      const action = {
        type: fetchGetUser.fulfilled.type,
        payload: getUserSuccessMock
      };
      const state = userSlice.reducer(initialState, action);
      const expectedState = {
        ...initialState,
        user: getUserSuccessMock.user,
        isAuthChecked: true,
        requestStatus: TrequestStatus.SUCCESS
      };
      expect(state).toEqual(expectedState);
    });

    it('fetchGetUser pending', () => {
      const action = { type: fetchGetUser.pending.type };
      const state = userSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        requestStatus: TrequestStatus.LOADING
      });
    });

    it('fetchGetUser rejected', () => {
      const action = {
        type: fetchGetUser.rejected.type,
        error: userRejectMock
      };
      const state = userSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        requestStatus: TrequestStatus.ERROR,
        error: userRejectMock.message
      });
      expect(state.error).toBe(userRejectMock.message);
    });
  });

  //Login User
  describe('fetchLoginUser', () => {
    it('fetchLoginUser fullfiled', () => {
      const action = {
        type: fetchLoginUser.fulfilled.type,
        payload: loginMock
      };
      const state = userSlice.reducer(initialStateIsAuth, action);
      const expectedState = {
        ...initialStateIsAuth,
        user: loginMock.user,
        requestStatus: TrequestStatus.SUCCESS
      };
      expect(state).toEqual(expectedState);
    });

    it('fetchLoginUser pending', () => {
      const action = { type: fetchLoginUser.pending.type };
      const state = userSlice.reducer(initialStateIsAuth, action);
      expect(state).toEqual({
        ...initialStateIsAuth,
        requestStatus: TrequestStatus.LOADING
      });
    });

    it('fetchLoginUser rejected', () => {
      const action = {
        type: fetchLoginUser.rejected.type,
        error: userRejectMock
      };
      const state = userSlice.reducer(initialStateIsAuth, action);
      expect(state).toEqual({
        ...initialStateIsAuth,
        requestStatus: TrequestStatus.ERROR,
        error: userRejectMock.message,
        userErrorMessage: ErrorMessages.FORM_SUBMIT_LOGIN
      });
      expect(state.error).toBe(userRejectMock.message);
      expect(state.userErrorMessage).toBe(ErrorMessages.FORM_SUBMIT_LOGIN);
    });
  });

  //Registration User
  describe('fetchRegisterUser', () => {
    it('fetchRegisterUser fullfiled', () => {
      const action = {
        type: fetchRegisterUser.fulfilled.type,
        payload: registerUserMock
      };
      const state = userSlice.reducer(initialStateIsAuth, action);
      const expectedState = {
        ...initialStateIsAuth,
        user: registerUserMock.user,
        requestStatus: TrequestStatus.SUCCESS
      };
      expect(state).toEqual(expectedState);
    });

    it('fetchRegisterUser pending', () => {
      const action = { type: fetchRegisterUser.pending.type };
      const state = userSlice.reducer(initialStateIsAuth, action);
      expect(state).toEqual({
        ...initialStateIsAuth,
        requestStatus: TrequestStatus.LOADING
      });
    });

    it('fetchRegisterUser rejected', () => {
      const action = {
        type: fetchRegisterUser.rejected.type,
        error: userRejectMock
      };
      const state = userSlice.reducer(initialStateIsAuth, action);
      expect(state).toEqual({
        ...initialStateIsAuth,
        requestStatus: TrequestStatus.ERROR,
        error: userRejectMock.message,
        userErrorMessage: ErrorMessages.FORM_SUBMIT_REGISTER
      });
      expect(state.error).toBe(userRejectMock.message);
      expect(state.userErrorMessage).toBe(ErrorMessages.FORM_SUBMIT_REGISTER);
    });
  });

  // Update User
  describe('fetchUpdateUser', () => {
    it('fetchUpdateUser fullfiled', () => {
      const action = {
        type: fetchUpdateUser.fulfilled.type,
        payload: updateUserMock
      };
      const state = userSlice.reducer(initialStateIsAuth, action);
      const expectedState = {
        ...initialStateIsAuth,
        user: updateUserMock.user,
        requestStatus: TrequestStatus.SUCCESS
      };
      expect(state).toEqual(expectedState);
    });

    it('fetchUpdateUser pending', () => {
      const action = { type: fetchUpdateUser.pending.type };
      const state = userSlice.reducer(initialStateIsAuth, action);
      expect(state).toEqual({
        ...initialStateIsAuth,
        requestStatus: TrequestStatus.LOADING
      });
    });

    it('fetchUpdateUser rejected', () => {
      const action = {
        type: fetchUpdateUser.rejected.type,
        error: userRejectMock
      };
      const state = userSlice.reducer(initialStateIsAuth, action);
      expect(state).toEqual({
        ...initialStateIsAuth,
        requestStatus: TrequestStatus.ERROR,
        error: userRejectMock.message,
        userErrorMessage: ErrorMessages.UPDATE_USER_SUBMIT_ERROR
      });
      expect(state.error).toBe(userRejectMock.message);
      expect(state.userErrorMessage).toBe(
        ErrorMessages.UPDATE_USER_SUBMIT_ERROR
      );
    });
  });

  // Logout User
  describe('fetchlogout', () => {
    it('fetchlogout fullfiled', () => {
      const action = { type: fetchlogout.fulfilled.type };
      const state = userSlice.reducer(userMock, action);
      const expectedState = {
        ...userMock,
        requestStatus: TrequestStatus.IDLE,
        user: null
      };
      expect(state).toEqual(expectedState);
    });

    it('fetchlogout pending', () => {
      const action = { type: fetchlogout.pending.type };
      const state = userSlice.reducer(userMock, action);
      expect(state).toEqual({
        ...userMock,
        requestStatus: TrequestStatus.LOADING
      });
    });

    it('fetchlogout rejected', () => {
      const action = { type: fetchlogout.rejected.type, error: userRejectMock };
      const state = userSlice.reducer(userMock, action);
      expect(state).toEqual({
        ...userMock,
        requestStatus: TrequestStatus.ERROR,
        error: userRejectMock.message
      });
      expect(state.error).toBe(userRejectMock.message);
    });
  });
});
