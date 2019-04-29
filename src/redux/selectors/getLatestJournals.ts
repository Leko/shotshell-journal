import { createSelector } from "reselect";
import { getJournals } from "./getJournals";
import { Journal } from "../../models/Journal";

export function mapLatestJournals(journals: Journal[]) {
  return journals.sort((a, b) => {
    return a.createdAt.getTime() - b.createdAt.getTime();
  });
}

export const getLatestJournals = createSelector(
  getJournals,
  mapLatestJournals
);
