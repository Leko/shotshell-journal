import React from "react";
import { StyleSheet, View } from "react-native";
import { Subtitle, Caption } from "@shoutem/ui";

type Props = {
  type: "error" | "warn" | "info";
  title: string;
  body: string;
  renderAction: () => React.ReactNode;
};

export function Notice(props: Props) {
  const { type, title, body, renderAction } = props;
  return (
    <View style={[styles.container, styles[type]]}>
      <Subtitle>{title}</Subtitle>
      <Caption>{body}</Caption>
      {renderAction()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8
  },
  error: {
    backgroundColor: "white"
  },
  warn: {
    backgroundColor: "white"
  },
  info: {
    backgroundColor: "white"
  }
});
