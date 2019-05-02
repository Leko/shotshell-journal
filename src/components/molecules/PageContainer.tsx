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
      {/* https://github.com/facebook/react-native/issues/19658#issuecomment-423814249 */}
      <KeyboardAwareScrollView contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView>{children}</SafeAreaView>
      </KeyboardAwareScrollView>
    </Screen>
  );
}
