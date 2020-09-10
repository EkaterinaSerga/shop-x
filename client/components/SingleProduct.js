import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProductThunk} from '../store/singleProduct'
import {postSingleOrderThunk} from '../store/order'
import {Link} from 'react-router-dom'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      buttonClass: 'checkOut'
    }
    this.addToCart = this.addToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleProducts(this.props.id)
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  handleClick() {
    this.setState({
      buttonClass:
        this.state.buttonClass === 'checked-out' ? 'checkOut' : 'checked-out'
    })
    this.props.postOrder()
  }

  addToCart() {
    const productToAdd = {
      id: this.props.singleProduct.id,
      name: this.props.singleProduct.name,
      price: this.props.singleProduct.price,
      imageUrl: this.props.singleProduct.imageUrl,
      quantity: this.state.quantity
      //       product: this.props.singleProduct,
      //       quantity: this.state.quantity
    }

    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([productToAdd]))
    } else {
      const newCart = JSON.parse(localStorage.getItem('cart'))
      const product = newCart.find(item => item.id === Number(this.props.id))
      if (product) {
        product.quantity =
          Number(product.quantity) + Number(this.state.quantity)
      } else {
        newCart.push(productToAdd)
      }
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
    this.setState({
      quantity: 1
    })
  }

  render() {
    console.log(this.props.singleProduct)

    if (!this.props.singleProduct) {
      return null
    }

    return (
      <div className="singleProduct">
        <div className="productImage singlePE">
          <img src={this.props.singleProduct.imageUrl} />
        </div>
        <div className="productInfo singlePE">
          <div className="productInfoBlock">
            <h2>{this.props.singleProduct.name}</h2>
          </div>
          <div className="productInfoBlock">
            <p>{this.props.singleProduct.description}</p>
          </div>
          <div className="singlePE">
            <h2>Price per item: {this.props.singleProduct.price}$</h2>
          </div>
        </div>
        <div className="singlePE">
          <div className="addCheckout">
            <input
              type="number"
              defaultValue="1"
              min="1"
              max="20"
              onChange={this.handleChange}
            />
            <button
              type="button"
              className={this.state.buttonClass}
              onClick={() => {
                this.addToCart()
              }}
              style={{
                width: '225px',
                margin: '20px'
              }}
            >
              ADD TO CART
            </button>
            <Link to="/cart">
              <button
                className={this.state.buttonClass}
                onClick={this.handleClick}
                style={{
                  width: '225px',
                  margin: '20px',
                  textAlign: 'center'
                }}
              >
                CHECKOUT
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state, props) => ({
  singleProduct: state.singleProduct,
  id: props.match.params.productId
})

const mapDispatchToProps = dispatch =>
  console.log('I was in mapDispatchToProps') || {
    fetchSingleProducts: id => dispatch(fetchSingleProductThunk(id)),
    postOrder: () => dispatch(postSingleOrderThunk())
  }

export default connect(mapState, mapDispatchToProps)(SingleProduct)
