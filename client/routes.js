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
  Home,
  Checkout
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
    console.log('blah')
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
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/allUsers" component={AllUsers} />
            <Route
              exact
              path="/products/:productId"
              component={SingleProduct}
            />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/cart/checkout" component={AllProducts} />
            <Route exact path="/cart" component={Checkout} />
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
