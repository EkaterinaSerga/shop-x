import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me} from '../store/user'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return <div>{props.email ? <h3>Welcome, {email}</h3> : null}</div>
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
