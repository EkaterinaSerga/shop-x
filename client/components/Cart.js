import React, {Component} from 'react'
import {CartItem} from './CartItem'
import {Link} from 'react-router-dom'

// let items = null
// if (localStorage.getItem('cart')) {
//   items = JSON.parse(localStorage.getItem('cart'))
// }
let totalItems, totalDue

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {products: [], cartTotal: 0}
    this.remove = this.remove.bind(this)
    this.emptyCart = this.emptyCart.bind(this)
  }

  componentDidMount() {
    const getCartItems = JSON.parse(localStorage.getItem('cart'))
    let sum = 0
    if (!getCartItems) return
    else {
      for (let i = 0; i < getCartItems.length; i++) {
        sum += getCartItems[i].price * getCartItems[i].quantity
      }
    }

    this.setState({products: getCartItems, cartTotal: sum})
  }

  emptyCart() {
    localStorage.removeItem('cart')
    this.setState({products: null})
  }

  remove(id) {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const newCart = cart.filter(product => product.id !== id)
    console.log('NEW CART', newCart)
    if (!newCart.length) {
      this.setState({products: null})
      localStorage.removeItem('cart')
    } else {
      this.setState({products: newCart})
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
  }

  render() {
    console.log('i am in cart')
    if (!localStorage.getItem('cart')) {
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
              <div
                key={exp.id}
                // style={{
                //   margin: '20px'
                // }}
              >
                <CartItem
                  product={exp}
                  key={index}
                  remove={() => this.remove(exp.id)}
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
