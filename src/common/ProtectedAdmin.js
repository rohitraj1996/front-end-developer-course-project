import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedAdmin = ({ token, roles, children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
        token && roles?.includes("ADMIN") ? (
        children
      ) : (
        <Navigate
          to="/signin"
          state={{ from: location }}
          replace={true}
        />
      )
    }
  />
);

export default ProtectedAdmin;
