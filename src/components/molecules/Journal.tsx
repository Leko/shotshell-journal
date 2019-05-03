import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Tile, View, Subtitle, Caption } from "@shoutem/ui";
import { Journal as JournalModel } from "../../models/Journal";

type Props = {
  journal: JournalModel;
  onRequestEdit: () => any;
  onRequestRemove: () => any;
};

export function Journal(props: Props) {
  const { journal, onRequestEdit, onRequestRemove } = props;

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
              <TouchableOpacity
                onPress={onRequestEdit}
                style={{ padding: 4, marginLeft: 4 }}
              >
                <Icon
                  name="edit"
                  style={{
                    fontSize: 18
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onRequestRemove}
                style={{ padding: 4, marginLeft: 4 }}
              >
                <Icon
                  name="clear-text"
                  style={{
                    fontSize: 18
                  }}
                />
              </TouchableOpacity>
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
