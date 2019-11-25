import { UnsavedExamine, Examine } from "../../../models/Examine"
import {
  ADD_EXAMINE,
  FETCH_EXAMINES_STARTED,
  FETCH_EXAMINES_SUCCEED,
  FETCH_EXAMINES_FAILED,
} from "./types"

export const addExamine = (examine: UnsavedExamine) => ({
  type: ADD_EXAMINE,
  examine,
})

export const fetchExaminesStart = () => ({
  type: FETCH_EXAMINES_STARTED,
})
export const fetchExaminesSuccess = (examines: Record<string, Examine>) => ({
  type: FETCH_EXAMINES_SUCCEED,
  examines,
})
export const fetchExaminesFailed = (error: Error) => ({
  type: FETCH_EXAMINES_FAILED,
  error,
})

export type Action =
  | ReturnType<typeof addExamine>
  | ReturnType<typeof fetchExaminesStart>
  | ReturnType<typeof fetchExaminesSuccess>
  | ReturnType<typeof fetchExaminesFailed>
