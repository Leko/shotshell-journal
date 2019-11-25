import React from "react"
import { StyleSheet } from "react-native"
import { View, Heading, Title, TextInput } from "@shoutem/ui"
import { FormikProps } from "formik"
import { PageContainer } from "../molecules/PageContainer"
import { Button } from "../molecules/Button"
import { DateInput } from "../organisms/DateInput"
import { ValidationError } from "../atoms/ValidationError"

type Payload = {
  remaining: number
  startsAt: Date
  endsAt: Date
}

type Props = {}

export function ConfirmPrint(props: Props & FormikProps<Payload>) {
  const {
    values,
    touched,
    errors,
    isValid,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = props
  const canSubmit = isValid && !isSubmitting

  return (
    <PageContainer>
      <View style={styles.container}>
        <Heading>管理帳簿を印刷する</Heading>

        <View style={{ marginVertical: 8 }}>
          <Title>前回の銃検日</Title>
          <DateInput
            value={values.startsAt}
            onFocus={() => {
              setFieldTouched("startsAt")
            }}
            onChange={date => {
              setFieldValue("startsAt", date)
            }}
          />
          <ValidationError field="startsAt" errors={errors} touched={touched} />
        </View>

        <View style={{ marginVertical: 8 }}>
          <Title>銃検日</Title>
          <DateInput
            value={values.endsAt}
            onFocus={() => {
              setFieldTouched("endsAt")
            }}
            onChange={date => {
              setFieldValue("endsAt", date)
            }}
          />
          <ValidationError field="endsAt" errors={errors} touched={touched} />
        </View>

        <View style={{ marginVertical: 8 }}>
          <Title>所持残弾数</Title>
          <TextInput
            keyboardType="decimal-pad"
            defaultValue={String(values.remaining)}
            onBlur={() => {
              setFieldTouched("remaining")
            }}
            onChangeText={(text: string) => {
              if (isNaN(parseInt(text, 10))) {
                return
              }
              setFieldValue("remaining", parseInt(text, 10))
            }}
          />
          <ValidationError
            field="remaining"
            errors={errors}
            touched={touched}
          />
        </View>

        <View style={{ marginVertical: 8 }}>
          <Button
            secondary
            icon="checkbox-on"
            label="印刷する"
            disabled={!canSubmit}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  pickerContainer: {},
  inputPlaceholder: {
    color: "black",
  },
  inputLike: {
    padding: 14,
    justifyContent: "flex-start",
  },
})
