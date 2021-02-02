import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, deleteProduct} from '../store/allProducts'
import ProductList from './ProductList'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <div className="allProducts">
        {!this.props.products.length ? (
          <h2>There are no products registered in the database</h2>
        ) : (
          this.props.products.map(exp => (
            <ProductList key={exp.id} product={exp} />
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
