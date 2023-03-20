import React from "react";
import { Redirect } from "react-router-dom";

/* import { Container } from "./styles";
 */
function Dashboard({ authenticated }) {
  if (!authenticated) {
    return <Redirect to="/login" />;
  }
  return <h1>Dashboard</h1>;
}

export default Dashboard;
