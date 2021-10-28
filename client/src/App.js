import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Auth from "./pages/Auth";
import { AUTH, DASHBOARD, FIRST_LOGIN } from "./routes";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact component={Auth} path={AUTH} />
        <Route exact component={Dashboard} path={DASHBOARD} />
        <Route exact component={Register} path={FIRST_LOGIN} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
