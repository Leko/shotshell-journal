type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type Examine = {
  id: string
  examinedAt: Date
  userId: string
  createdAt: Date
}

export type UnsavedExamine = Omit<Examine, "id" | "userId" | "createdAt">
