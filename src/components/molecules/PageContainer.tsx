import React from "react";
import { SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Screen } from "@shoutem/ui";

type Props = {
  children: React.ReactNode;
};

export function PageContainer(props: Props) {
  const { children } = props;

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <SafeAreaView>{children}</SafeAreaView>
      </KeyboardAwareScrollView>
    </Screen>
  );
}
