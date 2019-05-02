import { GQLMeetup } from "@shellshot-journal/schema";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type EntityMap = {
  meetup: Omit<GQLMeetup, "id">;
};
