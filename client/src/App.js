import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Auth from "./pages/Auth";
import { AUTH, DASHBOARD, FIRST_LOGIN } from "./routes";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import { useUserContext } from "./hooks/useUser";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const { user } = useUserContext();
  return (
    <Router>
      <Switch>
        <Route exact component={Auth} path={AUTH} />
        <ProtectedRoute exact path={DASHBOARD} user={user}>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute exact path={FIRST_LOGIN} user={user}>
          <Register />
        </ProtectedRoute>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
