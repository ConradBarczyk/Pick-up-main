import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ component: Component, ...rest}) => {

  const { currentUser } = useAuth();
  return (
    <Route {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/" /> //default route to redirect if user is not signed in
      }}
    ></Route>
  )
}

export default ProtectedRoute;