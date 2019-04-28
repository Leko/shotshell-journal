import React from "react";
import { SafeAreaView } from "react-native";
import { RouteComponentProps } from "react-router";
import { Image, Divider, View, Title, Button, Icon } from "@shoutem/ui";
import { User } from "../redux/store/user/state";

type Props = {
  user: User["user"] | null;
};

export function AppBar(props: Props & RouteComponentProps) {
  const { user, history } = props;

  return (
    <SafeAreaView>
      <View style={{ marginBottom: 8, flexDirection: "row" }}>
        <View style={{ width: 40 }}>
          {history.index > 0 ? (
            <Button styleName="clear" onPress={() => history.goBack()}>
              <Icon name="left-arrow" style={{ fontSize: 20 }} />
            </Button>
          ) : null}
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Title styleName="h-center v-center bold">実包等管理帳簿</Title>
        </View>
        <View
          style={{
            width: 40,
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          {user ? (
            <Image styleName="small-avatar" source={{ uri: user.photoUrl }} />
          ) : null}
        </View>
      </View>
      <Divider styleName="line" />
    </SafeAreaView>
  );
}
