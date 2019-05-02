import React from "react";
import { StyleSheet } from "react-native";
import { View, Heading, Button, Text } from "@shoutem/ui";
import { PageContainer } from "../molecules/PageContainer";

type Props = {
  onRequestLogin: () => any;
};

export function Guest(props: Props) {
  const { onRequestLogin } = props;

  return (
    <PageContainer>
      <View style={styles.container}>
        <Heading>Guest</Heading>

        <Button styleName="secondary" onPress={onRequestLogin}>
          <Text>Sign up with Google</Text>
        </Button>
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10
  }
});
