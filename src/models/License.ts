type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

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
  userId: string;
  createdAt: string;
} & (UnlimitedLicense | LimitedLicense);

export type UnsavedLicense = Omit<License, "id" | "userId" | "createdAt">;
