import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import './App.css'
import StateDetails from './components/StateDetails'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/state/:stateCode" component={StateDetails} />
    </Switch>
  </>
)

export default App
