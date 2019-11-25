import { User as UserModel } from "../../../models/User"

export type User = {
  type: "success"
  accessToken: string
  idToken?: string
  user: UserModel
}

export type State = {
  resolved: boolean
  rawUser: User | null
}
