import React, { useEffect, useState } from "react";
import { useRoutes } from "./routes";
import { connect } from "react-redux";
import Header from "./Header";

const App = ({ user }) => {
  let isAuth = false;
  if(localStorage.getItem("user")) {
    isAuth = !!JSON.parse(localStorage.getItem("user")).token;
  }
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth);

  useEffect(() => {
    if (user && user.token) {
      setIsAuthenticated(true);
    }
    return () => {};
  }, [user]);

  const routes = useRoutes(isAuthenticated);
  return (
    <>
      <Header />
      {routes}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user[0],
  };
};

export default connect(mapStateToProps, null)(App);
