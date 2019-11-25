import { License } from "../../../models/License"

export type State = {
  error: Error | null
  licenses: Record<string, License>
}
