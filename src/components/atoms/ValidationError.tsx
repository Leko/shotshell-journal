import React from "react"
import { Caption } from "@shoutem/ui"

type Props = {
  field: string
  errors: any
  touched: any
}

const getError = (
  field: string,
  {
    touched,
    errors,
  }: {
    touched: any
    errors: any
  }
) => (touched[field] && errors[field] ? errors[field] : null)

export function ValidationError(props: Props) {
  const { field, errors, touched } = props
  const error = getError(field, { errors, touched })
  return error ? <Caption>{error}</Caption> : null
}
