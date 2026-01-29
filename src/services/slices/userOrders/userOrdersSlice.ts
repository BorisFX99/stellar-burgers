import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import { TrequestStatus } from '@utils-types';
import { TOrder } from '@utils-types';
import { USER_ORDERS_SLICE_NAME } from '../sliceNames';
import { fetchUserOrders, fetchOrderBurger } from '@thunks';
import { TNewOrderResponse } from 'src/utils/Api/types';

export type TUserOrders = {
  orders: TOrder[];
  requestStatus: TrequestStatus;
  newOrder: TNewOrderResponse | null;
  orderRequest: boolean;
  error: string | null;
};

export const initialState: TUserOrders = {
  orders: [],
  requestStatus: TrequestStatus.IDLE,
  newOrder: null,
  orderRequest: false,
  error: null
};

export const userOrdersSlice = createSlice({
  name: USER_ORDERS_SLICE_NAME,
  initialState,
  reducers: {
    removeNewOrder: (state) => {
      state.newOrder = null;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.requestStatus = TrequestStatus.IDLE;
      state.newOrder = null;
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    }
  },
  selectors: {
    selectAllUserOrders: (state) => state.orders,
    selectRequestStatus: (state) => state.requestStatus,
    selectNewOrder: (state) => state.newOrder,
    selectOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.requestStatus = TrequestStatus.LOADING;
      })
      .addCase(fetchOrderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.orders = action.payload;
          state.requestStatus = TrequestStatus.SUCCESS;
          state.error = null;
        }
      )
      .addCase(
        fetchOrderBurger.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.newOrder = action.payload;
          state.requestStatus = TrequestStatus.SUCCESS;
          state.orderRequest = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchUserOrders.rejected, fetchOrderBurger.rejected),
        (state, action) => {
          state.requestStatus = TrequestStatus.ERROR;
          state.orderRequest = false;
          if (action.error?.message) state.error = action.error?.message;
        }
      );
  }
});

export default userOrdersSlice;
