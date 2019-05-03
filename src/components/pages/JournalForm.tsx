import React from "react";
import sortBy from "lodash/sortBy";
import uniq from "lodash/uniq";
import { StyleSheet } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Toggle } from "react-powerplug";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "react-native-modal-datetime-picker";
import {
  View,
  Text,
  Subtitle,
  Caption,
  Button,
  Icon,
  Heading,
  Title,
  TextInput
} from "@shoutem/ui";
import { FormikProps } from "formik";
import { License } from "../../models/License";
import { Journal } from "../../models/Journal";
import { UnsavedJournal } from "../../models/Journal";
import { Notice } from "../molecules/Notice";
import { PageContainer } from "../molecules/PageContainer";
import { ValidationError } from "../atoms/ValidationError";

type Props = {
  licenses: License[];
  journals: Journal[];
} & FormikProps<UnsavedJournal>;

const purposeToLanguage = {
  SHOOTING: "標的射撃",
  HUNTING: "狩猟"
};

export function JournalForm(props: Props & NavigationScreenProps) {
  const {
    licenses,
    journals,
    values,
    touched,
    errors,
    isValid,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    navigation
  } = props;
  const canSubmit = isValid && !isSubmitting;

  const monthDayFormatter = new Intl.DateTimeFormat("ja", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const stringify = (license: License) =>
    (license.kind === "unlimited"
      ? [
          "無許可",
          purposeToLanguage[license.purpose],
          monthDayFormatter.format(license.startsAt)
        ]
      : [
          purposeToLanguage[license.purpose],
          monthDayFormatter.format(license.startsAt),
          monthDayFormatter.format(license.expiredAt),
          `${license.gauge}番`,
          `${license.amount}発`
        ]
    ).join("-");

  const histories = uniq(
    sortBy(
      journals.filter(j => j.kind === values.kind),
      j => -j.createdAt.getTime()
    ).map(j => (j.kind === "receive" ? j.transferrer : j.place))
  ).slice(0, 5);
  const licensesToSelect = licenses.map(l => ({
    value: l,
    label: stringify(l)
  }));

  return (
    <PageContainer>
      <View style={styles.container}>
        <Heading>記録する</Heading>

        <View style={{ marginVertical: 8 }}>
          <Title>日時</Title>
          <Toggle
            initial={false}
            render={({ on, toggle }) => (
              <>
                <Button
                  style={{ justifyContent: "flex-start" }}
                  onPress={() => {
                    setFieldTouched("date");
                    toggle();
                  }}
                >
                  <Text>{monthDayFormatter.format(values.date)}</Text>
                </Button>
                <DateTimePicker
                  mode="date"
                  date={values.date}
                  isVisible={on}
                  onCancel={toggle}
                  onConfirm={date => {
                    setFieldValue("date", date);
                    toggle();
                  }}
                />
              </>
            )}
          />
          <ValidationError field="date" errors={errors} touched={touched} />
        </View>

        <View style={{ marginVertical: 8 }}>
          <Title>猟銃用火薬類等譲受証</Title>
          {licenses.length === 0 ? (
            <Notice
              type="warn"
              title="譲受許可証が登録されていません"
              body="譲受許可証を登録していただくと記録できるようになります"
              renderAction={() => (
                <Button
                  onPress={() => navigation.navigate("LicenseForm")}
                  styleName="secondary"
                >
                  <Icon name="receipt" />
                  <Text>猟銃用火薬類等譲受証を登録する</Text>
                </Button>
              )}
            />
          ) : licenses.length === 1 ? (
            <TextInput defaultValue={stringify(licenses[0])} editable={false} />
          ) : (
            <Button style={{ padding: 0, justifyContent: "flex-start" }}>
              <RNPickerSelect
                items={licensesToSelect}
                itemKey="label"
                style={{
                  placeholder: styles.inputPlaceholder,
                  inputIOS: styles.inputLike,
                  inputAndroid: styles.inputLike
                }}
                onClose={() => {
                  setFieldTouched("licenseId");
                }}
                onValueChange={item => {
                  setFieldValue("licenseId", item.id);
                }}
              />
            </Button>
          )}
          <ValidationError
            field="licenseId"
            errors={errors}
            touched={touched}
          />
        </View>

        <View style={{ marginVertical: 8 }}>
          <Title>記録の種類</Title>
          <View style={{ flexDirection: "row" }}>
            <Button
              styleName={[
                "full-width",
                values.kind === "consume" ? "secondary" : "muted"
              ].join(" ")}
              onPress={() => setFieldValue("kind", "consume")}
            >
              <Icon name="minus-button" />
              <Text>消費・譲渡</Text>
            </Button>
            <Button
              styleName={[
                "full-width",
                values.kind === "receive" ? "secondary" : "muted"
              ].join(" ")}
              onPress={() => setFieldValue("kind", "receive")}
            >
              <Icon name="plus-button" />
              <Text>購入・譲受</Text>
            </Button>
          </View>
          <ValidationError field="kind" errors={errors} touched={touched} />
        </View>

        <View style={{ marginVertical: 8 }}>
          <Title>数量</Title>
          <TextInput
            keyboardType="decimal-pad"
            defaultValue={String(values.amount)}
            onBlur={() => {
              setFieldTouched("amount");
            }}
            onChangeText={(text: string) => {
              if (isNaN(parseInt(text, 10))) {
                return;
              }
              setFieldValue("amount", parseInt(text, 10));
            }}
          />
          <ValidationError field="amount" errors={errors} touched={touched} />
        </View>

        <View style={{ marginVertical: 8 }}>
          {values.kind === "receive" ? (
            <>
              <Title>譲り渡し人</Title>
              <TextInput
                value={values.transferrer}
                onBlur={() => {
                  setFieldTouched("transferrer");
                }}
                onChangeText={(text: string) => {
                  setFieldValue("transferrer", text);
                }}
              />
              {histories.length ? (
                <View style={{ marginLeft: 16, marginTop: 8 }}>
                  <View styleName="horizontal" style={{ alignItems: "center" }}>
                    <Icon name="history" />
                    <Text>入力履歴から入力</Text>
                  </View>
                  {histories.map(transferrer => (
                    <View key={transferrer} style={{ marginBottom: 4 }}>
                      <Button
                        style={{ justifyContent: "flex-start" }}
                        onPress={() =>
                          setFieldValue("transferrer", transferrer)
                        }
                      >
                        <Caption>{transferrer}</Caption>
                      </Button>
                    </View>
                  ))}
                </View>
              ) : null}
              <ValidationError
                field="transferrer"
                errors={errors}
                touched={touched}
              />
            </>
          ) : (
            <>
              <Title>使用場所</Title>
              <TextInput
                value={values.place}
                onBlur={() => {
                  setFieldTouched("place");
                }}
                onChangeText={(text: string) => {
                  setFieldValue("place", text);
                }}
              />
              {histories.length ? (
                <View style={{ marginLeft: 16, marginTop: 8 }}>
                  <View styleName="horizontal" style={{ alignItems: "center" }}>
                    <Icon name="history" />
                    <Text>入力履歴から入力</Text>
                  </View>
                  {histories.map(place => (
                    <View key={place} style={{ marginBottom: 4 }}>
                      <Button
                        style={{ justifyContent: "flex-start" }}
                        onPress={() => setFieldValue("place", place)}
                      >
                        <Caption>{place}</Caption>
                      </Button>
                    </View>
                  ))}
                </View>
              ) : null}
              <ValidationError
                field="place"
                errors={errors}
                touched={touched}
              />
            </>
          )}
        </View>

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
