import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { Journal } from "../../models/Journal";
import { Journal as JournalItem } from "./Journal";

type Props = {
  items: Journal[];
};

export function JournalList(props: Props) {
  const { items } = props;
  return (
    <FlatList
      data={items}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <JournalItem journal={item} />}
    />
  );
}
