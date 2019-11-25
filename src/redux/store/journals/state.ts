import { Journal } from "../../../models/Journal"

export type State = {
  error: Error | null
  journals: Record<string, Journal>
}
