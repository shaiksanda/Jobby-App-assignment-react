import {Switch, Route} from 'react-router-dom'

import Login from './Components/Login'
import Home from './Components/Home'
import Jobs from './Components/Jobs'
import ProtectedRoute from './Components/ProtectedRoute'
import JobItemDetails from './Components/JobItemDetails'
import NotFound from './Components/NotFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
