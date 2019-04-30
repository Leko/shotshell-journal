import maxBy from "lodash/maxBy";
import { createSelector } from "reselect";
import { getLicenses } from "./getLicenses";
import { License } from "../../models/License";

export function mapLimitedLicense(licenses: License[]) {
  const limitedLicenses = licenses.filter(l => l.kind === "limited");
  return maxBy(limitedLicenses, l => l.expiredAt.getTime()) || null;
}

export const getLimitedLicense = createSelector(
  getLicenses,
  mapLimitedLicense
);
