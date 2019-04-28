import React from "react";
import { Route, RouteProps, Redirect } from "react-router-native";

type Props = RouteProps & {
  authenticated: boolean;
};

export function MemberRoute(props: Props) {
  const { authenticated, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          // @ts-ignore FIXME: JSX element type 'Component' does not have any construct or call signatures.
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/welcome",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
