import React from "react";
import { NativeRouter, Route, Redirect } from "react-router-native";
import MemberRoute from "./containers/MemberRoute";
import Guest from "./containers/Guest";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import OnBoarding from "./containers/OnBoarding";
import Dashboard from "./containers/Dashboard";
import JournalForm from "./containers/JournalForm";
import JournalDetail from "./containers/JournalDetail";
import JournalList from "./containers/JournalList";

type Props = {};

export function Routes(props: Props) {
  return (
    <NativeRouter>
      <MemberRoute exact path="/" component={Dashboard} />
      <Route path="/welcome" component={Guest} />
      <Route path="/login" component={Login} />
      <Route path="/signUp" component={SignUp} />
      <MemberRoute path="/onBoarding" component={OnBoarding} />
      <MemberRoute path="/journal/new" component={JournalForm} />
      <MemberRoute exact path="/journals" component={JournalList} />
      <MemberRoute path="/journals/:id" component={JournalDetail} />
    </NativeRouter>
  );
}
