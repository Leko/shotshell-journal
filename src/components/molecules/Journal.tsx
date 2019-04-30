import React from "react";
import { StyleSheet } from "react-native";
import { Tile, View, Subtitle, Caption } from "@shoutem/ui";
import { Journal as JournalModel } from "../../models/Journal";

type Props = {
  journal: JournalModel;
};

export function Journal(props: Props) {
  const { journal } = props;

  const monthDayFormatter = new Intl.DateTimeFormat("ja", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  return (
    <Tile style={styles.container}>
      <View styleName="content">
        <View styleName="horizontal">
          {journal.kind === "consume" ? (
            <Subtitle>
              -{journal.amount}、{journal.place}
            </Subtitle>
          ) : (
            <Subtitle>
              +{journal.amount}、{journal.transferrer}
            </Subtitle>
          )}
          <View
            style={{
              flex: 1,
              alignItems: "flex-end"
            }}
          >
            <View styleName="horizontal">
              <Caption>{monthDayFormatter.format(journal.date)}</Caption>
              <Caption>{monthDayFormatter.format(journal.date)}</Caption>
            </View>
          </View>
        </View>
      </View>
    </Tile>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8
  }
});
