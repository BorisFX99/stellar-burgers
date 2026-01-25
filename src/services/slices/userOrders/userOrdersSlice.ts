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
};

const initialState: TUserOrders = {
  orders: [],
  requestStatus: TrequestStatus.IDLE,
  newOrder: null,
  orderRequest: false
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
        }
      )
      .addCase(
        fetchOrderBurger.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.newOrder = action.payload;
          state.requestStatus = TrequestStatus.SUCCESS;
          state.orderRequest = false;
        }
      )
      .addMatcher(
        isAnyOf(fetchUserOrders.rejected, fetchOrderBurger.rejected),
        (state) => {
          state.requestStatus = TrequestStatus.ERROR;
          state.orderRequest = false;
        }
      );
  }
});

export default userOrdersSlice;
