import React from "react"
import { StyleSheet } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import {
  GridRow,
  Card,
  Title,
  View,
  Heading,
  Button,
  Text,
  Icon,
} from "@shoutem/ui"
import { PageContainer } from "../molecules/PageContainer"
import { JournalList } from "../molecules/JournalList"
import { Journal } from "../../models/Journal"
import { License } from "../../models/License"
import { differenceInCalendarDays } from "date-fns"

type Props = {
  hasCarryOver: boolean
  limitedLicense: License | null
  latestJournals: Journal[]
  remaining: number | null
  remainingLicenseCount: number | null
  onRequestEdit: (item: Journal) => any
  onRequestRemove: (item: Journal) => any
}

export function Dashboard(props: Props & NavigationScreenProps) {
  const {
    hasCarryOver,
    remaining,
    remainingLicenseCount,
    limitedLicense,
    latestJournals,
    navigation,
    onRequestEdit,
    onRequestRemove,
  } = props

  return (
    <PageContainer>
      <View style={styles.container}>
        {/* FIXME: Split to another file */}
        {hasCarryOver === false ? (
          <>
            <Heading>はじめに</Heading>
            <Text>初期設定を完了し実包等管理帳簿の利用を開始しましょう</Text>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => navigation.navigate("CarryOverForm")}
                styleName="secondary"
              >
                <Icon name="settings" />
                <Text>前葉繰越・前回の銃検日を登録する</Text>
              </Button>
            </View>
          </>
        ) : (
          <>
            <View style={{ height: 108 }}>
              <GridRow columns={2}>
                <Card styleName="flexible">
                  <View styleName="content">
                    <Heading>残弾</Heading>
                    <Title>
                      {remaining !== null ? `あと${remaining}発` : "-"}
                    </Title>
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
                  styleName="secondary"
                >
                  <Icon name="minus-button" />
                  <Text>消費・使用を記録する</Text>
                </Button>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() =>
                    navigation.navigate("JournalForm", { kind: "receive" })
                  }
                  styleName="secondary"
                >
                  <Icon name="plus-button" />
                  <Text>譲受・購入を記録する</Text>
                </Button>
              </View>
              <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate("LicenseForm")}>
                  <Icon name="receipt" />
                  <Text>猟銃用火薬類等譲受証を登録する</Text>
                </Button>
              </View>
              <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate("ConfirmPrint")}>
                  <Icon name="page" />
                  <Text>管理帳簿を印刷する</Text>
                </Button>
              </View>
            </View>
            <View style={{ marginTop: 16 }}>
              <Heading>最近の記録</Heading>
              {latestJournals.length > 0 ? (
                <>
                  <JournalList
                    items={latestJournals}
                    onRequestEdit={onRequestEdit}
                    onRequestRemove={onRequestRemove}
                  />
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
          </>
        )}
      </View>
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginBottom: 14,
  },
})
