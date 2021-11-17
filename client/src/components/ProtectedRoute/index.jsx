import React from "react";
import { AUTH } from "routes";
import { Redirect, Route } from "react-router-dom";

export function ProtectedRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: AUTH,
                state: { from: location },
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}
