import { MutationToCreateMeetupArgs } from "@shellshot-journal/schema";
import { EntityMap } from "../../entities";
import { Context } from "../Context";

export async function createMeetup(
  _: any,
  { title }: MutationToCreateMeetupArgs,
  context: Context<EntityMap>
) {
  const meetup = await context.repository.add("meetup", {
    title,
    draft: true,
    userId: context.user.uid
  });

  return meetup;
}
