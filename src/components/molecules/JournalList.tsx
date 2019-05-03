import React from "react";
import { FlatList } from "react-native";
import { Journal } from "../../models/Journal";
import { Journal as JournalItem } from "./Journal";

type Props = {
  items: Journal[];
  onRequestEdit: (item: Journal) => any;
  onRequestRemove: (item: Journal) => any;
};

export function JournalList(props: Props) {
  const { items, onRequestEdit, onRequestRemove } = props;
  return (
    <FlatList
      data={items}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <JournalItem
          journal={item}
          onRequestEdit={() => onRequestEdit(item)}
          onRequestRemove={() => onRequestRemove(item)}
        />
      )}
    />
  );
}
