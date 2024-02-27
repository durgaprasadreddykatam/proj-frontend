
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Update from './pages/Update';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/update' component={Update}/>
      </Switch>
    </Router>
  );
}

export default App;
