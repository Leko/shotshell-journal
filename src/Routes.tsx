import React from "react";
import { NativeRouter, Route, Redirect } from "react-router-native";
import AppBar from "./containers/AppBar";
import MemberRoute from "./containers/MemberRoute";
import Guest from "./containers/Guest";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import OnBoarding from "./containers/OnBoarding";
import Dashboard from "./containers/Dashboard";
import JournalForm from "./containers/JournalForm";
import LicenseForm from "./containers/LicenseForm";
import JournalDetail from "./containers/JournalDetail";
import JournalList from "./containers/JournalList";

type Props = {};

export function Routes(props: Props) {
  return (
    <NativeRouter>
      <AppBar />
      <MemberRoute exact path="/" component={Dashboard} />
      <Route path="/welcome" component={Guest} />
      <Route path="/login" component={Login} />
      <Route path="/signUp" component={SignUp} />
      <MemberRoute path="/onBoarding" component={OnBoarding} />
      <MemberRoute path="/journal/new" component={JournalForm} />
      <MemberRoute path="/license/new" component={LicenseForm} />
      <MemberRoute exact path="/journals" component={JournalList} />
      <MemberRoute path="/journals/:id" component={JournalDetail} />
    </NativeRouter>
  );
}
