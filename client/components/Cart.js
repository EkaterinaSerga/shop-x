import React, {Component} from 'react'
import {CartItem} from './CartItem'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {fetchOrderThunk} from '../store/order'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {products: [], cartTotal: 0}
    this.remove = this.remove.bind(this)
    this.emptyCart = this.emptyCart.bind(this)
  }

  async componentDidMount() {
    //fetch the user
    await this.props.getUser()

    //fetch existing incomplete order for the user, only if there is a loggedin user
    await this.props.getOrder(this.props.id)
    console.log('ORDER IN CART', this.props.order)
    let sum = 0
    let getCartItems = []
    //if there is an existing order, assign it's content to getCartItems
    if (this.props.order.data.length) {
      this.props.order.data.map(item =>
        getCartItems.push({
          id: item.id,
          name: item.name,
          price: item.order_detail.price,
          qty: item.order_detail.productQty,
          imageUrl: item.imageUrl,
          userId: this.props.id
        })
      )

      sum = this.props.order.data.reduce((acc, current) => {
        return (
          acc + current.order_detail.price * current.order_detail.productQty
        )
      }, 0)
      //if no existing order, check local storage (in case the user is a guest)
    } else {
      getCartItems = JSON.parse(localStorage.getItem('cart'))
      if (!getCartItems) return
      else {
        for (let i = 0; i < getCartItems.length; i++) {
          sum += getCartItems[i].price * getCartItems[i].qty
        }
      }
    }
    //update local state
    this.setState({products: getCartItems, cartTotal: sum})
  }

  emptyCart() {
    localStorage.removeItem('cart')
    this.setState({products: null})
  }

  remove(id) {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const newCart = cart.filter(product => product.id !== id)
    if (!newCart.length) {
      this.setState({products: null})
      localStorage.removeItem('cart')
    } else {
      this.setState({products: newCart})
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
  }

  render() {
    //if there is no user
    if (!this.props.id) return null

    // if (!localStorage.getItem('cart') && !this.props.order.length)
    if (!this.state.products.length) {
      return (
        <div>
          <h1
            style={{
              textAlign: 'center',
              fontFamily: ['Helvetica Neue', 'sans-serif'],
              fontWeight: 'lighter'
            }}
          >
            There are no items in cart
          </h1>
        </div>
      )
    }
    return (
      <div className="cart">
        <div
          className="cartAll"
          style={{
            width: '75%'
          }}
        >
          {this.state.products.map((exp, index) => {
            return (
              <div key={exp.id}>
                <CartItem
                  product={exp}
                  key={index}
                  remove={() => this.remove(exp.id)}
                  userId={this.props.id}
                  orderId={this.props.order.id}
                />
              </div>
            )
          })}
        </div>

        <div className="cartTotal addCheckout">
          <h2>Your Cart Total: ${this.state.cartTotal}</h2>
          <div className="checkout-btn">
            <Link to="/cart/checkout">
              <button
                className="checkout"
                type="button"
                style={{
                  padding: '10px',
                  width: '75%',
                  margin: '10px'
                }}
              >
                CHECKOUT -->
              </button>
            </Link>
          </div>
          <div className="empty-cart">
            <button
              className="empty-btn"
              type="button"
              onClick={this.emptyCart}
              style={{
                padding: '10px',
                width: '75%',
                margin: '10px',
                backgroundColor: 'red'
              }}
            >
              EMPTY CART
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    id: state.user.id,
    email: state.user.email,
    order: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    getOrder: id => dispatch(fetchOrderThunk(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
