import React from 'react'
import {connect} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'

const App = ({isLoggedIn}) => {
  return (
    <div>
      {isLoggedIn && <Navbar />}
      <Routes />
    </div>
  )
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(App)
