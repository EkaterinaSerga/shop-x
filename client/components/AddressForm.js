import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import NativeSelect from '@material-ui/core/NativeSelect'
import InputLabel from '@material-ui/core/InputLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import {connect} from 'react-redux'
// import CheckoutConfirmation from './checkout_confirmation'
import {me} from '../store/user'
import {postSingleOrderThunk} from '../store/order'

const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated States of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Island',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
]

class AddressForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      // email: this.props.email,
      address: '',
      city: '',
      state: '',
      zipCode: '',
      // step: 1,
      country: ''
    }

    this.getItemsFromCart = this.getItemsFromCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
    //   this.handlePreview = this.handlePreview.bind(this)
    //   this.handleConfirm = this.handleConfirm.bind(this)
    //   this.handleSelectionChange = this.handleSelectionChange.bind(this)
    this.setUser = this.setUser.bind(this)
  }

  componentDidMount() {
    this.props.getUser().then(this.setUser())
    this.getItemsFromCart()
    const cart = JSON.parse(localStorage.getItem('address'))
    if (!cart) {
      localStorage.setItem('address', JSON.stringify([this.state]))
    } else {
      this.setState({
        firstName: cart.firstName,
        lastName: cart.lastName,
        address: cart.address,
        city: cart.city,
        state: cart.state,
        zipCode: cart.zipCode,
        country: cart.country
      })
    }
  }

  getItemsFromCart() {
    if (window.localStorage.getItem('cart')) {
      const cart = JSON.parse(localStorage.getItem('cart'))
      return cart.map(item => {
        return (
          <p key={item.name}>
            {item.name} : {item.qty}
          </p>
        )
      })
    }
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
    this.props.handleChange(event)
  }

  async setUser() {
    await this.setState({
      email: this.props.email
    })
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Address"
              fullWidth
              autoComplete="shipping address-line1"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="demo-simple-select-label">
              State/Province/Region
            </InputLabel>
            <NativeSelect
              required
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              value={this.state.state}
              onChange={this.handleChange}
            >
              {states.map(state => (
                <option>{state}</option>
              ))}
            </NativeSelect>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zipCode"
              name="zipCode"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              value={this.state.zipCode}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              value={this.state.country}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
              style={{color: 'black'}}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapState = state => {
  return {
    id: state.user.id,
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    // getOrder: id => dispatch(fetchOrderThunk(id)),
    postOrder: () => dispatch(postSingleOrderThunk())
  }
}

export default connect(mapState, mapDispatch)(AddressForm)
