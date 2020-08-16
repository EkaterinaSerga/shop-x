import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  UserHome,
  AllProducts,
  SingleProduct,
  Cart,
  AllUsers,
  CheckoutForm,
  SignInSide,
  SignUp,
  Home
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    console.log({routesProps: this.props})
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={SignInSide} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/" component={SignInSide} />
        <Route exact path="/home2" component={Home} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/allUsers" component={AllUsers} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path="/products" component={AllProducts} />
            <Route exact path="/cart/checkout" component={CheckoutForm} />
            <Route path="/cart" component={Cart} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={SignInSide} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
