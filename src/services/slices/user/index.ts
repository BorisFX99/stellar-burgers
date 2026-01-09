import userSlice from './userSlice';
import {
  fetchGetUser,
  fetchLoginUser,
  fetchRegisterUser,
  fetchUpdateUser,
  fetchlogout
} from '@thunks';

export const userActions = {
  ...userSlice.actions,
  fetchGetUser,
  fetchLoginUser,
  fetchRegisterUser,
  fetchUpdateUser,
  fetchlogout
};
export const userSelectors = userSlice.selectors;

export { userSlice };
