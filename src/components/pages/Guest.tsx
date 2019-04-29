import React from "react";
import { StyleSheet } from "react-native";
import { View, Heading, Button, Text } from "@shoutem/ui";
import { Redirect } from "react-router";
import { PageContainer } from "../molecules/PageContainer";

type Props = {
  authenticated: boolean;
  onRequestLogin: () => any;
};

export function Guest(props: Props) {
  const { authenticated, onRequestLogin } = props;

  if (authenticated) {
    return <Redirect to="/" />;
  }

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
