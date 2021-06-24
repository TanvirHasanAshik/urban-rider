import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Notfound from './components/Notfound/Notfound';
import Destination from './components/Destination/Destination';
import Header from './components/Header/Header';
import Blog from './components/Blog/Blog';
import Login from './components/Login/Login';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/destination=:vehiclesType">
          <Destination></Destination>
        </Route>
        <Route path="/blog">
          <Blog></Blog>
        </Route>
        <Route path="/contact">
          <Contact></Contact>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="*">
          <Notfound></Notfound>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
