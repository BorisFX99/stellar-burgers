import { Dispatch, SetStateAction, RefObject } from 'react';
import { PageUIProps } from '../common-type';
import { TFormInputErrMsg } from '@utils-types';
export type LoginUIProps = PageUIProps & {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  submitDisabled?: boolean;
  emailErr?: boolean;
  inputErrMsg?: Pick<TFormInputErrMsg, 'emailError'>;
};
