import './App.css';
import Navbar from './components/navbar';
import Home from "./pages/home";
import Login from './components/adminLogin';
import NewsPage from './pages/newsPage';
import NewsDetails from './components/newsDetails';
import NewsDashboard from './components/newsDashboard';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import UpdateNewsForm from './components/updateNewsForm';
import Error404 from './components/404';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/allnews">
          <NewsPage />
        </Route>
        <Route exact path="/news/:id">
          <NewsDetails />
        </Route>
        <Route exact path="/adminlogin">
          <Login />
        </Route>
        <Route exact path="/gestion-actus">
          <NewsDashboard />
        </Route>
        <Route exact path="/modif-actus/:id">
          <UpdateNewsForm />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
