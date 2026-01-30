import { initialState } from './feedsSlice';
import { feedsSlice } from '@slices';
import { feedsActions } from '@slice/feeds';
import { feedsMock, feedsRejectMock, orderByNumberMock } from '@mocks';
import { TrequestStatus } from '@utils-types';
import { error } from 'console';

const { fetchAllFeeds, fetchOrderByNumber } = feedsActions;

describe('feedsSlice reducer ', () => {
  // Проверка запроса всех заказов
  describe('fetchAllFeeds', () => {
    it('fetchAllFeeds fullfiled', () => {
      const action = { type: fetchAllFeeds.fulfilled.type, payload: feedsMock };
      const state = feedsSlice.reducer(initialState, action);
      const expectedResult = {
        ...initialState,
        orders: feedsMock.orders,
        total: 23688,
        totalToday: 64,
        requestStatus: TrequestStatus.SUCCESS
      };
      expect(state).toEqual(expectedResult);
      expect(state.requestStatus).toBe(TrequestStatus.SUCCESS);
    });

    it('fetchAllFeeds pending', () => {
      const action = { type: fetchAllFeeds.pending.type };
      const state = feedsSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        requestStatus: TrequestStatus.LOADING
      });
    });

    it('fetchAllFeeds rejected', () => {
      const action = {
        type: fetchAllFeeds.rejected.type,
        error: feedsRejectMock
      };
      const state = feedsSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        requestStatus: TrequestStatus.ERROR,
        error: feedsRejectMock.message
      });
    });
  });
  // Проверка запроса конктертного заказа
  describe('fetchOrderByNumber', () => {
    const prevState = {
      ...initialState,
      orders: feedsMock.orders,
      total: 23688,
      totalToday: 64,
      requestStatus: TrequestStatus.SUCCESS
    };

    it('fetchOrderByNumber fullfiled', () => {
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: orderByNumberMock
      };
      const state = feedsSlice.reducer(prevState, action);
      expect(state).toEqual({
        ...prevState,
        selectedOrderByNumber: orderByNumberMock.orders[0]
      });
      expect(state.requestStatus).toBe(TrequestStatus.SUCCESS);
    });

    it('fetchOrderByNumber pending', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const state = feedsSlice.reducer(prevState, action);

      expect(state).toEqual({
        ...prevState,
        requestStatus: TrequestStatus.LOADING
      });
    });

    it('fetchOrderByNumber rejected', () => {
      const action = {
        type: fetchOrderByNumber.rejected.type,
        error: feedsRejectMock
      };
      const state = feedsSlice.reducer(prevState, action);

      expect(state).toEqual({
        ...prevState,
        requestStatus: TrequestStatus.ERROR,
        error: feedsRejectMock.message
      });
    });
  });
});
