import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Blog from "./components/Blog/Blog";
import Category from "./components/Category/Category";
import Contact from "./components/Contact/Contact";
import Destination from "./components/Destination/Destination";
import Header from "./components/Header/Header";
import Home from './components/Home/Home';
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";


export const MyContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <MyContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>

        <Header />
        <Switch>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/blog">
            <Blog />
          </Route>

          <Route path="/contact">
            <Contact />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <PrivateRoute path="/destination/:category">
            <Destination />
          </PrivateRoute>

          <PrivateRoute path="/:carDetails">
            <Category />
          </PrivateRoute>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="*">
            <h1>Page Not Found 404!!</h1>
          </Route>
        </Switch>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
