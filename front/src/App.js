import { BrowserRouter, Switch, Route,} from "react-router-dom";
import './App.css';
import Navbar from './components/navbar';
import Home from "./pages/home";
import Login from './components/adminLogin';
import NewsPage from './pages/newsPage';
import NewsDetails from './components/newsDetails';
import NewsDashboard from './components/newsDashboard';
import ContactForm from './components/contactForm';
import UpdateNewsForm from './components/updateNewsForm';
import AddNewsForm from './components/addNewsForm';
import Error404 from './components/404';
import AllFixtures from './components/allFixtures';
import AllTopScorers from './components/allTopScorers';
import ActuSliderHomepage from "./components/actuSliderHome";
import Standings from "./components/standings";

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
        <Route exact path="/add-news">
          <AddNewsForm />
        </Route>
        <Route exact path="/allfixtures">
          <AllFixtures />
        </Route>
        <Route exact path="/alltopscorers">
          <AllTopScorers />
        </Route>
        <Route exact path="/classements">
          <Standings />
        </Route>    
        <Route exact path="/contact">
          <ContactForm />
        </Route>
        <Route exact path="/slider">
          <ActuSliderHomepage />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
