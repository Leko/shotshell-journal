import React from "react"
import { StyleSheet } from "react-native"
import { View, Heading } from "@shoutem/ui"
import { Journal } from "../../models/Journal"
import { PageContainer } from "../molecules/PageContainer"
import { JournalList as JournalListComponent } from "../molecules/JournalList"

type Props = {
  journals: Journal[]
}

export function JournalList(props: Props) {
  const { journals } = props

  return (
    <PageContainer>
      <View style={styles.container}>
        <JournalListComponent items={journals} />
      </View>
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
})
