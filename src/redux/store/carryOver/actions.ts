import { CarryOver } from "../../../models/CarryOver";
import {
  SET_CARRY_OVER,
  FETCH_CARRY_OVERS_STARTED,
  FETCH_CARRY_OVERS_FAILED
} from "./types";

export const setCarryOver = (carryOver: CarryOver) => ({
  type: SET_CARRY_OVER,
  carryOver
});
export const fetchCarryOversStart = () => ({
  type: FETCH_CARRY_OVERS_STARTED
});
export const fetchCarryOversFailed = (error: Error) => ({
  type: FETCH_CARRY_OVERS_FAILED,
  error
});

export type Action =
  | ReturnType<typeof setCarryOver>
  | ReturnType<typeof fetchCarryOversStart>
  | ReturnType<typeof fetchCarryOversFailed>;
