import React from "react";
import { WebView } from "react-native";

type Props = {};

export function Terms(props: Props) {
  return (
    <WebView
      source={{ uri: "https://shellshot-journal.firebaseapp.com/terms.html" }}
      style={{ flex: 1 }}
    />
  );
}
