import { initialState } from './userOrdersSlice';
import { userOrdersSlice } from '@slices';
import { userOrdersActions } from '@slice/userOrders';
import { userOrdersMock, userNewOrderMock, userOrdersRejectMock } from '@mocks';
import { TrequestStatus } from '@utils-types';
import { error } from 'console';

const { fetchOrderBurger, fetchUserOrders } = userOrdersActions;

describe('userOrdersSlice reducer ', () => {
  // Проверка запроса всех ордеров пользователя
  describe('fetchUserOrders', () => {
    it('fetchUserOrders fullfiled', () => {
      const action = {
        type: fetchUserOrders.fulfilled.type,
        payload: userOrdersMock
      };
      const state = userOrdersSlice.reducer(initialState, action);
      const expectedResult = {
        ...initialState,
        orders: userOrdersMock,
        requestStatus: TrequestStatus.SUCCESS
      };
      expect(state).toEqual(expectedResult);
      expect(state.requestStatus).toBe(TrequestStatus.SUCCESS);
    });

    it('fetchUserOrders pending', () => {
      const action = { type: fetchUserOrders.pending.type };
      const state = userOrdersSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        requestStatus: TrequestStatus.LOADING
      });
    });

    it('fetchUserOrders rejected', () => {
      const action = {
        type: fetchUserOrders.rejected.type,
        error: userOrdersRejectMock
      };
      const state = userOrdersSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        requestStatus: TrequestStatus.ERROR,
        error: userOrdersRejectMock.message
      });
    });
  });

  // Проверка запроса на создание ордера-заказа
  describe('fetchOrderBurger', () => {
    it('fetchOrderBurger fullfiled', () => {
      const action = {
        type: fetchOrderBurger.fulfilled.type,
        payload: userNewOrderMock
      };
      const state = userOrdersSlice.reducer(initialState, action);
      const expectedResult = {
        ...initialState,
        requestStatus: TrequestStatus.SUCCESS,
        newOrder: userNewOrderMock,
        orderRequest: false
      };
      expect(state).toEqual(expectedResult);
      expect(state.requestStatus).toBe(TrequestStatus.SUCCESS);
    });

    it('fetchOrderBurger pending', () => {
      const action = { type: fetchOrderBurger.pending.type };
      const state = userOrdersSlice.reducer(initialState, action);

      expect(state).toEqual({ ...initialState, orderRequest: true });
    });

    it('fetchOrderBurger rejected', () => {
      const action = {
        type: fetchOrderBurger.rejected.type,
        error: userOrdersRejectMock
      };
      const state = userOrdersSlice.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        requestStatus: TrequestStatus.ERROR,
        orderRequest: false,
        error: userOrdersRejectMock.message
      });
    });
  });
});
