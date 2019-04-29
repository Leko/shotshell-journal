type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type Journal = {
  id: string;
  date: Date;
  userId: string;
  licenseId: string;
  amount: number;
} & (
  | {
      kind: "consume";
      transferrer: string;
    }
  | {
      kind: "receive";
      place: string;
    });

export type UnsavedJournal = Omit<Journal, "id" | "userId">;
