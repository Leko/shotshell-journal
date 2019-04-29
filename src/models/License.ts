export type Purpose = "SHOOTING" | "HUNTING";

export type UnlimitedLicense = {
  kind: "unlimited";
  gauge: number;
  purpose: Purpose;
  startsAt: Date;
};
export type LimitedLicense = {
  kind: "limited";
  gauge: number;
  amount: number;
  purpose: Purpose;
  startsAt: Date;
  expiredAt: Date;
};

export type License = {
  id: string;
} & (UnlimitedLicense | LimitedLicense);
