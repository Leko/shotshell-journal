import React from "react";
import { StyleSheet } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import {
  GridRow,
  Card,
  Title,
  View,
  Heading,
  Button,
  Text,
  Icon
} from "@shoutem/ui";
import { PageContainer } from "../molecules/PageContainer";
import { JournalList } from "../molecules/JournalList";
import { Journal } from "../../models/Journal";
import { License } from "../../models/License";
import { differenceInCalendarDays } from "date-fns";

type Props = {
  hasLicense: boolean;
  limitedLicense: License | null;
  latestJournals: Journal[];
  remaining: number | null;
  remainingLicenseCount: number | null;
  onRequestPrint: () => any;
};

export function Dashboard(props: Props & NavigationScreenProps) {
  const {
    hasLicense,
    remaining,
    remainingLicenseCount,
    limitedLicense,
    latestJournals,
    onRequestPrint,
    navigation
  } = props;

  return (
    <PageContainer>
      <View style={styles.container}>
        <View style={{ height: 108 }}>
          <GridRow columns={2}>
            <Card styleName="flexible">
              <View styleName="content">
                <Heading>残弾</Heading>
                <Title>{remaining !== null ? `あと${remaining}発` : "-"}</Title>
              </View>
            </Card>
            <Card styleName="flexible">
              <View styleName="content">
                <Heading>譲受許可</Heading>
                {limitedLicense ? (
                  <Title>
                    {remainingLicenseCount !== null
                      ? `あと${remainingLicenseCount}発`
                      : "-"}
                    {"\n"}（あと
                    {differenceInCalendarDays(
                      limitedLicense.expiredAt,
                      new Date()
                    )}
                    日）
                  </Title>
                ) : (
                  <Title>-</Title>
                )}
              </View>
            </Card>
          </GridRow>
        </View>
        <View style={{ marginTop: 16 }}>
          <Heading>記録</Heading>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() =>
                navigation.navigate("JournalForm", { kind: "consume" })
              }
              styleName={["secondary", hasLicense ? "" : "muted"].join(" ")}
              disabled={!hasLicense}
            >
              <Icon name="minus-button" />
              <Text>実包の消費を記録する</Text>
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() =>
                navigation.navigate("JournalForm", { kind: "receive" })
              }
              styleName={["secondary", hasLicense ? "" : "muted"].join(" ")}
              disabled={!hasLicense}
            >
              <Icon name="plus-button" />
              <Text>実包の譲受を記録する</Text>
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={() => navigation.navigate("LicenseForm")}>
              <Icon name="receipt" />
              <Text>猟銃用火薬類等譲受証を登録する</Text>
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={onRequestPrint}>
              <Icon name="page" />
              <Text>管理帳簿を印刷する</Text>
            </Button>
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
          <Heading>最近の記録</Heading>
          {latestJournals.length > 0 ? (
            <>
              <JournalList items={latestJournals} />
              <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate("JournalList")}>
                  <Icon name="more-horizontal" />
                  <Text>すべて見る</Text>
                </Button>
              </View>
            </>
          ) : (
            <>
              <Text>記録がありません</Text>
            </>
          )}
        </View>
      </View>
    </PageContainer>
  );
}
Dashboard.navigationOptions = {
  title: "実包等管理帳簿"
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  buttonContainer: {
    marginBottom: 14
  }
});
