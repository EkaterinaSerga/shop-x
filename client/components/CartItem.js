import React, {Component} from 'react'

export class CartItem extends Component {
  constructor(props) {
    super(props)
    // this.state = {quantity: 1}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    console.log('I got into handle change')
    const newCart = JSON.parse(localStorage.getItem('cart'))
    const selectedItem = newCart.find(
      product => product.id === this.props.product.id
    )
    selectedItem.quantity = event.target.value
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  render() {
    return (
      <div className="cartItem">
        <div className="cartImage">
          <img src={this.props.product.imageUrl} />
        </div>
        <div className="cartDetails">
          <div className="cartDetailsBlock">
            <h1>{this.props.product.name}</h1>
          </div>
          <div>
            <h2>Price:{this.props.product.price}</h2>
            <h2>Quantity:</h2>
            <input
              type="number"
              defaultValue={this.props.product.quantity}
              min="1"
              max="20"
              onChange={this.handleChange}
            />
            <button type="button" onClick={this.props.remove}>
              remove
            </button>
          </div>
        </div>
      </div>
    )
  }
}
