import React from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {Link} from 'react-router-dom'

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qty: 1
    }
    this.addToCart = this.addToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.add = this.add.bind(this)
    this.subtract = this.subtract.bind(this)
    this.valueCheck = this.valueCheck.bind(this)
  }

  addToCart(event) {
    const productToAdd = {
      id: this.props.product.id,
      name: this.props.product.name,
      price: this.props.product.price,
      quantity: Number(this.state.qty),
      imageUrl: this.props.product.imageUrl
    }

    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([productToAdd]))
    } else {
      const newCart = JSON.parse(localStorage.getItem('cart'))
      const product = newCart.find(item => item.id === Number(event.target.id))
      if (product) {
        product.quantity = Number(product.quantity) + Number(this.state.qty)
      } else {
        newCart.push(productToAdd)
      }
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
    alert('Added to cart!')
    this.setState({
      qty: 1
    })
  }

  valueCheck(value) {
    if (value < 1 || value > 20) {
      alert('This is an invalid input, please select a number between 1 and 20')
      throw new Error('Invalid value')
    }
  }

  handleChange(event) {
    this.valueCheck(event.target.value)
    this.setState({
      qty: parseInt(event.target.value)
    })
  }

  add() {
    this.valueCheck(this.state.qty + 1)
    this.setState({
      qty: this.state.qty + 1
    })
  }

  subtract() {
    this.valueCheck(this.state.qty - 1)
    this.setState({
      qty: this.state.qty - 1
    })
  }

  render() {
    const {product} = this.props
    return (
      <div className="list-ctn">
        <Link to={`/products/${product.id}`}>
          <img src={product.imageUrl} className="list-item-image" />
          <h1>{product.name}</h1>
        </Link>
        <div id="priceCart">
          <p
            style={{
              fontSize: '25px',
              color: 'white',
              width: '50%',
              textAlign: 'center'
            }}
          >
            ${product.price}
          </p>
          <div className="quantity-control">
            <button className="quantity-btn minus" onClick={this.subtract}>
              <svg viewBox="0 0 409.6 409.6">
                <g>
                  <g>
                    <path d="M392.533,187.733H17.067C7.641,187.733,0,195.374,0,204.8s7.641,17.067,17.067,17.067h375.467 c9.426,0,17.067-7.641,17.067-17.067S401.959,187.733,392.533,187.733z" />
                  </g>
                </g>
              </svg>
            </button>
            <input
              type="number"
              className="quantity-input"
              defaultValue="1"
              onChange={this.handleChange}
              min="1"
              max="20"
              name="quantity"
              value={this.state.qty}
            />
            <button className="quantity-btn plus" onClick={this.add}>
              <svg viewBox="0 0 426.66667 426.66667">
                <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
              </svg>
            </button>
          </div>
        </div>
        <button
          onClick={this.addToCart}
          id={product.id}
          type="button"
          className="addToCart"
        >
          <ShoppingCartIcon />
        </button>
      </div>
    )
  }
}

export default ProductList
