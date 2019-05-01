import addYears from "date-fns/add_years";
import addMonths from "date-fns/add_months";
import subDays from "date-fns/sub_days";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type Purpose = "SHOOTING" | "HUNTING";

export type UnlimitedLicense = {
  kind: "unlimited";
  gauge: number;
  purpose: Purpose;
};
export type LimitedLicense = {
  kind: "limited";
  gauge: number;
  purpose: Purpose;
  amount: number;
};

export type License = {
  id: string;
  userId: string;
  createdAt: Date;
  startsAt: Date;
  expiredAt: Date;
} & (UnlimitedLicense | LimitedLicense);

export type UnsavedLicense = Omit<License, "id" | "userId" | "createdAt">;

export function getUnlimitedExpiredAt(date: Date) {
  return subDays(addMonths(date, 4), 1);
}
export function getLimitedExpiredAt(date: Date) {
  return subDays(addYears(date, 1), 1);
}
export function getPurposeName(purpose: Purpose) {
  return purpose === "HUNTING" ? "狩猟" : "標的射撃";
}
