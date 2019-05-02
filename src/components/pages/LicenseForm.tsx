import React from "react";
import { StyleSheet } from "react-native";
import { Toggle } from "react-powerplug";
import DateTimePicker from "react-native-modal-datetime-picker";
import {
  View,
  Text,
  Button,
  Icon,
  Heading,
  Title,
  TextInput
} from "@shoutem/ui";
import { FormikProps } from "formik";
import {
  UnsavedLicense,
  getUnlimitedExpiredAt,
  getLimitedExpiredAt,
  getPurposeName
} from "../../models/License";
import { PageContainer } from "../molecules/PageContainer";
import { ValidationError } from "../atoms/ValidationError";

type Props = {} & FormikProps<UnsavedLicense>;

export function LicenseForm(props: Props) {
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

  const monthDayFormatter = new Intl.DateTimeFormat("ja", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  return (
    <PageContainer>
      <View style={styles.container}>
        <Heading>猟銃用火薬類等譲受証を登録する</Heading>

        <View style={{ marginVertical: 8 }}>
          <Title>種類</Title>
          <View style={{ flexDirection: "row" }}>
            <Button
              styleName={[
                "full-width",
                values.kind === "limited" ? "secondary" : "muted"
              ].join(" ")}
              onPress={() => setFieldValue("kind", "limited")}
            >
              <Text>通常</Text>
            </Button>
            <Button
              styleName={[
                "full-width",
                values.kind === "unlimited" ? "secondary" : "muted"
              ].join(" ")}
              onPress={() => setFieldValue("kind", "unlimited")}
            >
              <Text>無許可</Text>
            </Button>
          </View>
          <ValidationError field="kind" errors={errors} touched={touched} />
        </View>

        <View style={{ marginVertical: 8 }}>
          <Title>用途</Title>
          <View style={{ flexDirection: "row" }}>
            <Button
              styleName={[
                "full-width",
                values.purpose === "SHOOTING" ? "secondary" : "muted"
              ].join(" ")}
              onPress={() => setFieldValue("purpose", "SHOOTING")}
            >
              <Text>{getPurposeName("SHOOTING")}</Text>
            </Button>
            <Button
              styleName={[
                "full-width",
                values.purpose === "HUNTING" ? "secondary" : "muted"
              ].join(" ")}
              onPress={() => setFieldValue("purpose", "HUNTING")}
            >
              <Text>{getPurposeName("HUNTING")}</Text>
            </Button>
          </View>
          <ValidationError field="kind" errors={errors} touched={touched} />
        </View>

        <View style={{ marginVertical: 8 }}>
          <Title>発行日</Title>
          <Toggle
            initial={false}
            render={({ on, toggle }) => (
              <>
                <Button
                  style={{ justifyContent: "flex-start" }}
                  onPress={() => {
                    setFieldTouched("startsAt");
                    toggle();
                  }}
                >
                  <Text>{monthDayFormatter.format(values.startsAt)}</Text>
                </Button>
                <DateTimePicker
                  mode="date"
                  date={values.startsAt}
                  isVisible={on}
                  onCancel={toggle}
                  onConfirm={date => {
                    setFieldValue("startsAt", date);
                    setFieldValue(
                      "expiredAt",
                      values.kind === "limited"
                        ? getLimitedExpiredAt(date)
                        : getUnlimitedExpiredAt(date)
                    );
                    toggle();
                  }}
                />
              </>
            )}
          />
          <ValidationError field="startsAt" errors={errors} touched={touched} />
        </View>

        <View style={{ marginVertical: 8 }}>
          <Title>有効期限</Title>
          <Toggle
            initial={false}
            render={({ on, toggle }) => (
              <>
                <Button
                  style={{ justifyContent: "flex-start" }}
                  onPress={() => {
                    setFieldTouched("expiredAt");
                    toggle();
                  }}
                >
                  <Text>{monthDayFormatter.format(values.expiredAt)}</Text>
                </Button>
                <DateTimePicker
                  mode="date"
                  date={values.expiredAt}
                  isVisible={on}
                  onCancel={toggle}
                  onConfirm={date => {
                    setFieldValue("expiredAt", date);
                    toggle();
                  }}
                />
              </>
            )}
          />
          <ValidationError
            field="expiredAt"
            errors={errors}
            touched={touched}
          />
        </View>

        {values.kind === "limited" ? (
          <>
            <View style={{ marginVertical: 8 }}>
              <Title>弾数</Title>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={String(values.amount)}
                onBlur={() => {
                  setFieldTouched("amount");
                }}
                onChangeText={(text: string) => {
                  setFieldValue("amount", parseInt(text, 10));
                }}
              />
              <ValidationError
                field="amount"
                errors={errors}
                touched={touched}
              />
            </View>

            <View style={{ marginVertical: 8 }}>
              <Title>ゲージ・番径</Title>
              <TextInput
                keyboardType="decimal-pad"
                defaultValue={String(values.gauge)}
                onBlur={() => {
                  setFieldTouched("gauge");
                }}
                onChangeText={(text: string) => {
                  setFieldValue("gauge", parseInt(text, 10));
                }}
              />
              <ValidationError
                field="gauge"
                errors={errors}
                touched={touched}
              />
            </View>
          </>
        ) : null}

        <View style={{ marginVertical: 8 }}>
          <Button
            styleName={["secondary", canSubmit ? "" : "muted"].join(" ")}
            disabled={!canSubmit}
            onPress={handleSubmit}
          >
            <Icon name="checkbox-on" />
            <Text>記録する</Text>
          </Button>
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
