type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type CarryOver = {
  id: string
  remaining: number
  userId: string
  createdAt: Date
}

export type UnsavedCarryOver = Omit<CarryOver, "id" | "userId" | "createdAt">
