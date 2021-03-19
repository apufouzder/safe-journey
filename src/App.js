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
import Destination from "./components/Destination/Destination";
import Home from './components/Home/Home';
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";


export const MyContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <MyContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <h5>Email: {loggedInUser.name}</h5>
        <Switch>

          <Route path="/home">
            <Home />
          </Route>

          {/* <Route path="/destination">
            <Destination />
          </Route> */}

          <Route path="/destination/:category">
            <Destination />
          </Route>

          <Route path="/:carDetails">
            <Category />
          </Route>

          <Route path="/blog">
            <Blog />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

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
