import React from 'react'

class ProductList extends React.Component {
  render() {
    return (
      <div className="list-ctn">
        <img src={this.props.product.imageUrl} />
        <h1>{this.props.product.name}</h1>
        {/* <p>{this.props.products.description}</p> */}
        <p>{this.props.product.price}</p>
        <input
          type="number"
          defaultValue="1"
          onChange={this.props.change}
          min="1"
          max="20"
        />
        <button
          onClick={this.props.addToCart}
          id={this.props.product.id}
          type="button"
        >
          Add To Cart
        </button>
      </div>
    )
  }
}

export default ProductList
