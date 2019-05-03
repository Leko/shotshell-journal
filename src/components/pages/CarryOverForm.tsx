import React from "react";
import { StyleSheet } from "react-native";
import { FormikProps } from "formik";
import { View, Heading, Title, Caption, TextInput } from "@shoutem/ui";
import { UnsavedCarryOver } from "../../models/CarryOver";
import { UnsavedExamine } from "../../models/Examine";
import { PageContainer } from "../molecules/PageContainer";
import { Button } from "../molecules/Button";
import { ValidationError } from "../atoms/ValidationError";
import { DateInput } from "../organisms/DateInput";

type CarryOverAndExamine = UnsavedCarryOver & UnsavedExamine;

type Props = {};

export function CarryOverForm(props: Props & FormikProps<CarryOverAndExamine>) {
  const {
    values,
    touched,
    errors,
    isValid,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    setFieldTouched
  } = props;
  const canSubmit = isValid && !isSubmitting;

  return (
    <PageContainer>
      <View style={styles.container}>
        <Heading>前葉繰越・前回の銃検日を登録する</Heading>

        <View style={{ marginVertical: 8 }}>
          <Title>前回の銃検日</Title>
          <Caption>次回の銃検の際に集計する開始日として利用します</Caption>
          <DateInput
            value={values.examinedAt}
            onFocus={() => {
              setFieldTouched("examinedAt");
            }}
            onChange={date => {
              setFieldValue("examinedAt", date);
            }}
          />
          <ValidationError
            field="examinedAt"
            errors={errors}
            touched={touched}
          />
        </View>

        <View style={{ marginVertical: 8 }}>
          <Title>所持残弾数</Title>
          <TextInput
            keyboardType="decimal-pad"
            defaultValue={String(values.remaining)}
            onBlur={() => {
              setFieldTouched("remaining");
            }}
            onChangeText={(text: string) => {
              if (isNaN(parseInt(text, 10))) {
                return;
              }
              setFieldValue("remaining", parseInt(text, 10));
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
            label="設定する"
            disabled={!canSubmit}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  pickerContainer: {},
  inputPlaceholder: {
    color: "black"
  },
  inputLike: {
    padding: 14,
    justifyContent: "flex-start"
  }
});
