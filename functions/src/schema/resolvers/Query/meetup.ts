import { QueryToMeetupArgs } from "@shellshot-journal/schema";
import { EntityMap } from "../../entities";
import { ID } from "../../../repository/types";
import { Context } from "../Context";

export async function meetup(
  _: any,
  { id }: QueryToMeetupArgs,
  context: Context<EntityMap>
) {
  return context.repository.get("meetup", (id as unknown) as ID);
}
