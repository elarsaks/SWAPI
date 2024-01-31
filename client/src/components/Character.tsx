import { Redirect, Route, RouteProps } from "react-router-dom";

import React from "react";
import { useAuth } from "../store/AuthContext";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

// TODO: Build here auth protected character page
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
