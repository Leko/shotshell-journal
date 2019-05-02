import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import { Button, Icon } from "@shoutem/ui";
import AuthLoading from "./containers/AuthLoading";
import Guest from "./containers/Guest";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import OnBoarding from "./containers/OnBoarding";
import Dashboard from "./containers/Dashboard";
import JournalForm from "./containers/JournalForm";
import LicenseForm from "./containers/LicenseForm";
import JournalDetail from "./containers/JournalDetail";
import JournalList from "./containers/JournalList";

const MemberStack = createDrawerNavigator(
  {
    Drawer: createStackNavigator(
      {
        Dashboard,
        JournalForm,
        LicenseForm,
        JournalList,
        JournalDetail
      },
      {
        initialRouteName: "Dashboard"
        // headerMode: "none"
      }
    )
  },
  {
    drawerType: "slide",
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: (
        <Button onPress={() => navigation.openDrawer()}>
          <Icon name="sidebar" />
        </Button>
      )
    })
    // contentComponent: props => <Menu {...props} />,
  }
);

const RootStack = createStackNavigator(
  {
    AuthLoading,
    MemberStack,
    Guest,
    Login,
    SignUp,
    OnBoarding
  },
  {
    initialRouteName: "AuthLoading",
    headerMode: "none",
    mode: Platform.OS === "ios" ? "modal" : "card"
  }
);

export const Routes = createAppContainer(RootStack);
