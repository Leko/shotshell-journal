import React from "react";
import { StyleSheet } from "react-native";
import { Link } from "react-router-native";
import {
  Screen,
  GridRow,
  Card,
  Title,
  View,
  Heading,
  Button,
  Text,
  Icon
} from "@shoutem/ui";

type Props = {
  onPressCunsume: () => any;
  onPressReceive: () => any;
  onPressTicket: () => any;
  onPressExamineDate: () => any;
};

export function Dashboard(props: Props) {
  const {
    onPressCunsume,
    onPressReceive,
    onPressTicket,
    onPressExamineDate
  } = props;

  return (
    <Screen style={styles.container}>
      <View style={{ height: 108 }}>
        <GridRow columns={2}>
          <Card styleName="flexible">
            <View styleName="content">
              <Heading>残弾</Heading>
              <Title>{123}発</Title>
            </View>
          </Card>
          <Card styleName="flexible">
            <View styleName="content">
              <Heading>譲受許可</Heading>
              <Title>
                {123}発{"\n"}（あと{25}日）
              </Title>
            </View>
          </Card>
        </GridRow>
      </View>
      <View style={{ flex: 1, marginTop: 16 }}>
        <Heading>記録</Heading>
        <View style={styles.buttonContainer}>
          <Link
            to="/journal/new?tab=cunsume"
            component={Button}
            styleName="secondary"
          >
            <Icon name="minus-button" />
            <Text>実包の消費を記録する</Text>
          </Link>
        </View>
        <View style={styles.buttonContainer}>
          <Link
            to="/journal/new?tab=receive"
            component={Button}
            styleName="secondary"
          >
            <Icon name="plus-button" />
            <Text>実包の譲受を記録する</Text>
          </Link>
        </View>
        <View style={styles.buttonContainer}>
          <Link to="/license/new" component={Button}>
            <Icon name="receipt" />
            <Text>猟銃用火薬類等譲受票を登録する</Text>
          </Link>
        </View>
        <View style={styles.buttonContainer}>
          <Link to="/examine/new" component={Button}>
            <Icon name="add-event" />
            <Text>銃検日を登録する</Text>
          </Link>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  buttonContainer: {
    marginBottom: 14
  }
});
