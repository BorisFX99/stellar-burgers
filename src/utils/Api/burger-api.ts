import { ErrorMessages } from '@utils-types';
import { setCookie, getCookie } from '../cookie';
import {
  TServerResponse,
  TRefreshResponse,
  TIngredientsResponse,
  TFeedsResponse,
  TOrdersResponse,
  TNewOrderResponse,
  TOrderResponse,
  TRegisterData,
  TAuthResponse,
  TUserResponse,
  TLoginData
} from './types';

const URL =
  process.env.BURGER_API_URL || 'https://norma.education-services.ru/api';

export class Api {
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  private baseUrl: string;

  private checkResponse = <T>(res: Response): Promise<T> =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

  private fetchWithRefresh = async <T>(
    url: RequestInfo,
    options: RequestInit
  ) => {
    try {
      const res = await fetch(url, options);
      return await this.checkResponse<T>(res);
    } catch (err) {
      if ((err as { message: string }).message === 'jwt expired') {
        const refreshData = await this.refreshToken();
        if (options.headers) {
          (options.headers as { [key: string]: string }).authorization =
            refreshData.accessToken;
        }
        const res = await fetch(url, options);
        return await this.checkResponse<T>(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

  refreshToken = (): Promise<TRefreshResponse> =>
    fetch(`${this.baseUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
      .then((res) => this.checkResponse<TRefreshResponse>(res))
      .then((refreshData) => {
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem('refreshToken', refreshData.refreshToken);
        setCookie('accessToken', refreshData.accessToken);
        return refreshData;
      });

  getIngredientsApi = () =>
    fetch(`${this.baseUrl}/ingredients`)
      .then((res) => this.checkResponse<TIngredientsResponse>(res))
      .then((data) => {
        if (data?.success) return data.data;
        return Promise.reject(data);
      });

  getFeedsApi = () =>
    fetch(`${this.baseUrl}/orders/all`)
      .then((res) => this.checkResponse<TFeedsResponse>(res))
      .then((data) => {
        if (data?.success) return data;
        return Promise.reject(data);
      });

  getOrdersApi = () =>
    this.fetchWithRefresh<TFeedsResponse>(`${this.baseUrl}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken')
      } as HeadersInit
    }).then((data) => {
      if (data?.success) return data.orders;
      return Promise.reject(data);
    });

  orderBurgerApi = (data: string[]) =>
    this.fetchWithRefresh<TNewOrderResponse>(`${this.baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken')
      } as HeadersInit,
      body: JSON.stringify({
        ingredients: data
      })
    }).then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

  getOrderByNumberApi = (number: number) =>
    fetch(`${this.baseUrl}/orders/${number}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => this.checkResponse<TOrderResponse>(res));

  registerUserApi = (data: TRegisterData) =>
    fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then((res) => this.checkResponse<TAuthResponse>(res))
      .then((data) => {
        if (data?.success) return data;
        return Promise.reject(data);
      });

  loginUserApi = (data: TLoginData) =>
    fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then((res) => this.checkResponse<TAuthResponse>(res))
      .then((data) => {
        if (data?.success) return data;
        return Promise.reject(data);
      });

  forgotPasswordApi = (data: { email: string }) =>
    fetch(`${this.baseUrl}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then((res) => this.checkResponse<TServerResponse<{}>>(res))
      .then((data) => {
        if (data?.success) return data;
        return Promise.reject(data);
      });

  resetPasswordApi = (data: { password: string; token: string }) =>
    fetch(`${this.baseUrl}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then((res) => this.checkResponse<TServerResponse<{}>>(res))
      .then((data) => {
        if (data?.success) return data;
        return Promise.reject(data);
      });

  getUserApi = () =>
    this.fetchWithRefresh<TUserResponse>(`${this.baseUrl}/auth/user`, {
      headers: {
        authorization: getCookie('accessToken')
      } as HeadersInit
    });

  updateUserApi = (user: Partial<TRegisterData>) =>
    this.fetchWithRefresh<TUserResponse>(`${this.baseUrl}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken')
      } as HeadersInit,
      body: JSON.stringify(user)
    });

  logoutApi = () =>
    fetch(`${this.baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    }).then((res) => this.checkResponse<TServerResponse<{}>>(res));
}

export const api = new Api(URL);
