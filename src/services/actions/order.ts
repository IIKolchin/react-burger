import { URL, checkResponse, getOrderRequest } from "../../utils/api";
import { getCookie } from "../../utils/cookie";
import { AppDispatch, AppThunk } from "../types";
import { TOrder } from "../types/data";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const SHOW_ORDER: "SHOW_ORDER" = "SHOW_ORDER";
export const CLOSE_ORDER: "CLOSE_ORDER" = "CLOSE_ORDER";

export interface IGetOrderAction {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  order: TOrder;
}
export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}
export interface IShowOrderAction {
  readonly type: typeof SHOW_ORDER;
}
export interface ICloseOrderAction {
  readonly type: typeof CLOSE_ORDER;
}

export type TOrderActions =
  | IGetOrderAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction
  | IShowOrderAction
  | ICloseOrderAction;

export const getOrder: AppThunk = (id: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrderRequest(id)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res.order,
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
};
