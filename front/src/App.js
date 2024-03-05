import './App.css';
import Home from "./pages/home";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      {/* <Route path="/match">
      </Route> */}
    </Switch>
  </BrowserRouter>

  );
}

export default App;
