import './App.css';
// Importing Components
import Navigation from './components/Navigation/Navigation';
// React Router
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// Importing Pages
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup.js';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/login"><Login /></Route>
        <Route path="/register"><Signup /></Route>
        <Route path="/"><Home /></Route>
      </Switch>
    </Router>
  );
}
export default App;