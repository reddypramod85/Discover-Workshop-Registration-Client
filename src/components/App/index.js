import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grommet, Box } from "grommet";
import {
  AppHeader,
  Register,
  Success,
  Cancel,
  Modify,
  Hpedev,
  AppFooter
} from "../../components";

import { hpe } from "grommet-theme-hpe";

function App() {
  return (
    <Grommet full theme={hpe} themeMode="dark">
      <Box
        fill="vertical"
        overflow="auto"
        align="center"
        flex={true}
        direction="column"
        justify="start"
      >
        <AppHeader />
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Register />} />
            <Route
              exact
              path="/success"
              render={props => <Success {...props} />}
            />
            <Route
              exact
              path="/cancel"
              render={props => <Cancel {...props} />}
            />
            <Route
              exact
              path="/modify"
              render={props => <Modify {...props} />}
            />
          </Switch>
        </Router>
        <Hpedev />
        <AppFooter />
      </Box>
    </Grommet>
  );
}
export default App;
