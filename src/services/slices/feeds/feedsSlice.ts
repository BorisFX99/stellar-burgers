import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import { TrequestStatus, TOrder } from '@utils-types';
import { TFeedsResponse, TOrderResponse } from 'src/utils/Api/types';
import { FEEDS_SLICE_NAME } from '../sliceNames';
import { fetchAllFeeds, fetchOrderByNumber } from '@thunks';

export type Tfeeds = Omit<TFeedsResponse, 'success'> & {
  requestStatus: TrequestStatus;
  selectedOrderByNumber: TOrder | null;
  newFeeds: string[];
};

const initialState: Tfeeds = {
  orders: [],
  total: 0,
  totalToday: 0,
  requestStatus: TrequestStatus.IDLE,
  selectedOrderByNumber: null,
  newFeeds: []
};

export const feedsSlice = createSlice({
  name: FEEDS_SLICE_NAME,
  initialState,
  reducers: {
    clearFeeds: (state) => {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.requestStatus = TrequestStatus.IDLE;
      state.selectedOrderByNumber = null;
    },
    removeNewFeeds: (state) => {
      state.newFeeds = [];
    }
  },
  selectors: {
    selectAllOrders: (state) => state.orders,
    selectRequestStatus: (state) => state.requestStatus,
    selectFeed: (state) => ({
      orders:state.orders,
      total: state.total,
      totalToday: state.totalToday,
    }),
    selectOrderByNumber: (state) => state.selectedOrderByNumber,
    selectOrderNumber: (state) =>
      state.selectedOrderByNumber
        ? state.selectedOrderByNumber.number.toString()
        : '',
    selectNewFeeds: (state) => state.newFeeds
  },
  extraReducers: (builder) => {
    builder
      // Уникальная логика для каждого fulfilled
      .addCase(
        fetchAllFeeds.fulfilled,
        (state, action: PayloadAction<TFeedsResponse>) => {
          const { success, ...feedsData } = action.payload;
          if (state.orders.length > 0) {
            state.newFeeds = feedsData.orders
              .filter(
                (newFeed) =>
                  !state.orders.some((oldFeed) => oldFeed._id === newFeed._id)
              )
              .map((newFeed) => newFeed._id);
          }
          Object.assign(state, feedsData);
          state.requestStatus = TrequestStatus.SUCCESS;
        }
      )
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrderResponse>) => {
          state.requestStatus = TrequestStatus.SUCCESS;
          const { orders } = action.payload;
          if (orders && orders.length > 0) {
            state.selectedOrderByNumber = action.payload.orders[0];
          }
        }
      )
      // Общая обработка для всех pending thunk
      .addMatcher(
        isAnyOf(fetchAllFeeds.pending, fetchOrderByNumber.pending),
        (state) => {
          state.requestStatus = TrequestStatus.LOADING;
        }
      )
      // Общая обработка для всех rejected
      .addMatcher(
        isAnyOf(fetchAllFeeds.rejected, fetchOrderByNumber.rejected),
        (state) => {
          state.requestStatus = TrequestStatus.ERROR;
        }
      );
  }
});

export default feedsSlice;
