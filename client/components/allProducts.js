import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {fetchProducts, deleteProduct} from '../store/allProducts'
import ProductList from './ProductList'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
    this.props.getUser()
  }

  render() {
    return (
      <div className="allProducts">
        {!this.props.products.length ? (
          <h2>There are no products registered in the database</h2>
        ) : (
          this.props.products.map(exp => (
            <ProductList key={exp.id} product={exp} user={this.props.user} />
          ))
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {products: state.products, user: state.user}
}

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(me()),
  fetchProducts: () => dispatch(fetchProducts()),
  deleteProduct: id => dispatch(deleteProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
