import sumBy from "lodash/sumBy";
import { createSelector } from "reselect";
import { License } from "../../models/License";
import { Journal } from "../../models/Journal";
import { getJournals } from "./getJournals";
import { getLimitedLicense } from "./getLimitedLicense";

function mapRemaining(limitedLicense: License | null, journals: Journal[]) {
  if (!limitedLicense) {
    return null;
  }

  const filtered = journals.filter(j => j.licenseId === limitedLicense.id);
  const consumeJournals = filtered.filter(j => j.kind === "consume");
  const receiveJournals = filtered.filter(j => j.kind === "receive");
  return (
    sumBy(receiveJournals, j => j.amount) -
    sumBy(consumeJournals, j => j.amount)
  );
}

export const getRemaining = createSelector(
  getLimitedLicense,
  getJournals,
  mapRemaining
);
