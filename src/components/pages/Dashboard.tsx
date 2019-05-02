import React from "react";
import { StyleSheet } from "react-native";
import { Link } from "react-router-native";
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

export function Dashboard(props: Props) {
  const {
    hasLicense,
    remaining,
    remainingLicenseCount,
    limitedLicense,
    latestJournals,
    onRequestPrint
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
            <Link
              to={{ pathname: "/journal/new", state: { kind: "consume" } }}
              component={Button}
              styleName={["secondary", hasLicense ? "" : "muted"].join(" ")}
              disabled={!hasLicense}
            >
              <Icon name="minus-button" />
              <Text>実包の消費を記録する</Text>
            </Link>
          </View>
          <View style={styles.buttonContainer}>
            <Link
              to={{ pathname: "/journal/new", state: { kind: "receive" } }}
              component={Button}
              styleName={["secondary", hasLicense ? "" : "muted"].join(" ")}
              disabled={!hasLicense}
            >
              <Icon name="plus-button" />
              <Text>実包の譲受を記録する</Text>
            </Link>
          </View>
          <View style={styles.buttonContainer}>
            <Link to="/license/new" component={Button}>
              <Icon name="receipt" />
              <Text>猟銃用火薬類等譲受証を登録する</Text>
            </Link>
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
                <Link to="/journals" component={Button}>
                  <Icon name="more-horizontal" />
                  <Text>すべて見る</Text>
                </Link>
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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  buttonContainer: {
    marginBottom: 14
  }
});
