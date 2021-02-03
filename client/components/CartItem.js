import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export class CartItem extends Component {
  constructor(props) {
    super(props)
    // this.state = {quantity: 1}
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(event) {
    console.log(
      'things in handleChnade',
      event.target.value,
      this.props.orderId,
      this.props.product.id
    )
    if (this.props.userId) {
      await axios.put('/api/cart/', {
        qty: Number(event.target.value),
        orderId: this.props.orderId,
        productId: this.props.product.id
      })
      //update order details
    } else {
      const newCart = JSON.parse(localStorage.getItem('cart'))
      const selectedItem = newCart.find(
        product => product.id === this.props.product.id
      )
      selectedItem.qty = event.target.value
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
  }

  render() {
    return (
      <div className="cartItem">
        <Link to={`/products/${this.props.product.id}`}>
          <div className="cartImage">
            <img src={this.props.product.imageUrl} />
          </div>
        </Link>
        <div className="cartDetails">
          <div className="cartDetailsBlock">
            <h1>{this.props.product.name}</h1>
          </div>
          <div>
            <h2>Price per item: ${this.props.product.price}</h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'left',
                alignItems: 'center'
              }}
              className="addCheckout"
            >
              <h2>Quantity:</h2>
              <input
                type="number"
                defaultValue={this.props.product.qty}
                min="1"
                max="20"
                onChange={this.handleChange}
              />

              <button
                type="button"
                onClick={this.props.remove}
                style={{
                  backgroundColor: 'black',
                  color: 'white'
                }}
              >
                REMOVE
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
