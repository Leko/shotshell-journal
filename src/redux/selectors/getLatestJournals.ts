import sortBy from "lodash/sortBy"
import { createSelector } from "reselect"
import { getJournals } from "./getJournals"
import { Journal } from "../../models/Journal"

export function mapLatestJournals(journals: Journal[]) {
  return sortBy(journals, j => -j.createdAt.getTime())
}

export const getLatestJournals = createSelector(getJournals, mapLatestJournals)
