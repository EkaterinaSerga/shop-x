import React from 'react'

class ProductList extends React.Component {
  render() {
    return (
      <div className="list-ctn">
        <img src={this.props.product.imageUrl} />
        <h1 style={{fontSize: '25px'}}>{this.props.product.name}</h1>
        {/* <p>{this.props.products.description}</p> */}
        <div id="priceCart">
          <p
            style={{
              fontSize: '25px',
              color: 'white',
              width: '30%',
              textAlign: 'center'
            }}
          >
            ${this.props.product.price}
          </p>
          <input
            type="number"
            defaultValue="1"
            onChange={this.props.change}
            min="1"
            max="20"
            style={{width: '20%'}}
          />
          <button
            style={{width: '50%'}}
            onClick={this.props.addToCart}
            id={this.props.product.id}
            type="button"
          >
            Add To Cart
          </button>
        </div>
      </div>
    )
  }
}

export default ProductList
