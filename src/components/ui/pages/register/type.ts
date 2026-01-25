import { Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../common-type';
import { TFormInputErrMsg, TFormInputErr } from '@utils-types';

export type RegisterUIProps = PageUIProps & {
  password: string;
  userName: string;
  setPassword: Dispatch<SetStateAction<string>>;
  setUserName: Dispatch<SetStateAction<string>>;
  submitDisabled: boolean;
  inputErr?: TFormInputErr;
  inputErrMsg?: TFormInputErrMsg;
};
