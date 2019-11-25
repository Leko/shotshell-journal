import { License } from "../../../models/License"
import {
  ADD_LICENSE,
  FETCH_LICENSES_STARTED,
  FETCH_LICENSES_SUCCEED,
  FETCH_LICENSES_FAILED,
} from "./types"

export const addLicense = (license: License) => ({
  type: ADD_LICENSE,
  license,
})

export const fetchLicensesStart = () => ({
  type: FETCH_LICENSES_STARTED,
})
export const fetchLicensesSuccess = (licenses: Record<string, License>) => ({
  type: FETCH_LICENSES_SUCCEED,
  licenses,
})
export const fetchLicensesFailed = (error: Error) => ({
  type: FETCH_LICENSES_FAILED,
  error,
})

export type Action =
  | ReturnType<typeof addLicense>
  | ReturnType<typeof fetchLicensesStart>
  | ReturnType<typeof fetchLicensesSuccess>
  | ReturnType<typeof fetchLicensesFailed>
