import { User as UserModel } from "../../../models/User"

export type User = {
  type: "success"
  accessToken: string | null
  idToken: string | null
  user: UserModel
}

export type State = {
  resolved: boolean
  rawUser: User | null
}
