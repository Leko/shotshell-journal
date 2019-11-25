import React from "react"
import { Text, Button } from "@shoutem/ui"
import { Toggle } from "react-powerplug"
import DateTimePicker from "react-native-modal-datetime-picker"

type Props = {
  value: Date
  onFocus?: () => any
  onBlur?: () => any
  onChange: (date: Date) => any
}

export function DateInput(props: Props) {
  const { value, onFocus, onBlur, onChange } = props

  const monthDayFormatter = new Intl.DateTimeFormat("ja", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  return (
    <Toggle
      initial={false}
      render={({ on, toggle }) => (
        <>
          <Button
            style={{ justifyContent: "flex-start" }}
            onPress={() => {
              if (onFocus) {
                onFocus()
              }
              toggle()
            }}
          >
            <Text>{monthDayFormatter.format(value)}</Text>
          </Button>
          <DateTimePicker
            mode="date"
            date={value}
            isVisible={on}
            onCancel={toggle}
            onConfirm={date => {
              if (onBlur) {
                onBlur()
              }
              onChange(date)
              toggle()
            }}
          />
        </>
      )}
    />
  )
}
