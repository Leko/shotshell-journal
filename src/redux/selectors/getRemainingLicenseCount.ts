import sumBy from "lodash/sumBy";
import { createSelector } from "reselect";
import { License, LimitedLicense } from "../../models/License";
import { Journal } from "../../models/Journal";
import { getJournals } from "./getJournals";
import { getLimitedLicense } from "./getLimitedLicense";

function mapRemainingLicenseCount(
  limitedLicense: License | null,
  journals: Journal[]
) {
  if (!limitedLicense) {
    return null;
  }

  const filtered = journals.filter(j => j.licenseId === limitedLicense.id);
  const receiveJournals = filtered.filter(j => j.kind === "receive");
  return (
    (limitedLicense as LimitedLicense).amount -
    sumBy(receiveJournals, j => j.amount)
  );
}

export const getRemainingLicenseCount = createSelector(
  getLimitedLicense,
  getJournals,
  mapRemainingLicenseCount
);
