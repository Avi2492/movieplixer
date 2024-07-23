import React from "react";
import HomeScreen from "./HomeScreen";
import AuthScreen from "./AuthScreen";

const HomePage = () => {
  const user = false;
  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
