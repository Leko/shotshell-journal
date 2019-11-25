import React from "react"
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createAppContainer,
  NavigationScreenProps,
} from "react-navigation"
import { Button, Icon } from "@shoutem/ui"
import AuthLoading from "./containers/AuthLoading"
import Menu from "./containers/Menu"
import Guest from "./containers/Guest"
import Login from "./containers/Login"
import SignUp from "./containers/SignUp"
import CarryOverForm from "./containers/CarryOverForm"
import Dashboard from "./containers/Dashboard"
import ConfirmPrint from "./containers/ConfirmPrint"
import JournalForm from "./containers/JournalForm"
import JournalEditForm from "./containers/JournalEditForm"
import LicenseForm from "./containers/LicenseForm"
import JournalDetail from "./containers/JournalDetail"
import JournalList from "./containers/JournalList"
import { Terms } from "./components/pages/Terms"

const GuestStack = createStackNavigator(
  {
    Guest,
    Login,
    SignUp,
  },
  {
    initialRouteName: "Guest",
  }
)

const MemberStack = createDrawerNavigator(
  {
    Drawer: createStackNavigator(
      {
        Terms: {
          screen: Terms,
          navigationOptions: {
            title: "利用規約",
          },
        },

        Dashboard: {
          screen: Dashboard,
          navigationOptions: ({ navigation }: NavigationScreenProps) => ({
            title: "実包等管理帳簿",
            headerLeft: () => (
              <Button onPress={() => navigation.openDrawer()}>
                <Icon name="sidebar" />
              </Button>
            ),
          }),
        },
        CarryOverForm: {
          screen: CarryOverForm,
          navigationOptions: {
            title: "初期設定",
          },
        },
        ConfirmPrint: {
          screen: ConfirmPrint,
          navigationOptions: {
            title: "管理帳簿を印刷する",
          },
        },
        JournalForm: {
          screen: JournalForm,
          navigationOptions: {
            title: "記録する",
          },
        },
        JournalEditForm: {
          screen: JournalEditForm,
          navigationOptions: {
            title: "記録を編集する",
          },
        },
        LicenseForm: {
          screen: LicenseForm,
          navigationOptions: {
            title: "譲受許可証を登録する",
          },
        },
        JournalList: {
          screen: JournalList,
          navigationOptions: {
            title: "使用・譲受一覧",
          },
        },
        JournalDetail: {
          screen: JournalDetail,
          navigationOptions: {
            title: "TODO: To be dynamic",
          },
        },
      },
      {
        initialRouteName: "Dashboard",
        defaultNavigationOptions: ({ navigation }) => ({
          headerBackTitle: null,
          headerBackImage: (
            <Button onPress={() => navigation.goBack()}>
              <Icon name="left-arrow" />
            </Button>
          ),
        }),
      }
    ),
  },
  {
    contentComponent: Menu,
  }
)

const RootStack = createSwitchNavigator(
  {
    AuthLoading,
    GuestStack,
    MemberStack,
  },
  {
    initialRouteName: "AuthLoading",
  }
)

export const Routes = createAppContainer(RootStack)
