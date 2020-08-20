import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, deleteProduct} from '../store/allProducts'
import {postSingleOrderThunk} from '../store/order'
import ProductList from './productList'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qty: 1
    }
    this.addToCart = this.addToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  addToCart(event) {
    const productToAdd = {
      id: this.props.products[event.target.id - 1].id,
      name: this.props.products[event.target.id - 1].name,
      price: this.props.products[event.target.id - 1].price,
      quantity: Number(this.state.qty),
      imageUrl: this.props.products[event.target.id - 1].imageUrl
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
    this.setState({
      qty: 1
    })
  }

  handleChange(event) {
    this.setState({
      qty: event.target.value
    })
  }
  render() {
    return (
      <div className="allProducts">
        {!this.props.products.length ? (
          <h2>There are no products registered in the database</h2>
        ) : (
          this.props.products.map(exp => (
            <ProductList
              key={exp.id}
              product={exp}
              change={this.handleChange}
              addToCart={this.addToCart}
            />
          ))
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {products: state.products}
}

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  deleteProduct: id => dispatch(deleteProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
