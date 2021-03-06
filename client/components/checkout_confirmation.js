import React from 'react'

const CheckoutConfirmation = props => {
  const hanldeSubmit = () => {
    props.postOrder()
    props.handleConfirm()
  }
  return (
    <div>
      <ul>
        <div>
          Name:{' '}
          <span>
            {props.orderDetails.firstName + ' ' + props.orderDetails.lastName}
          </span>
        </div>

        <div>
          Email: <span>{props.email || props.orderDetails.email}</span>
        </div>

        <div>
          Address:
          <p>{props.orderDetails.address}</p>
          <span>
            {props.orderDetails.city + ', ' + props.orderDetails.state}
          </span>
          <p>{props.orderDetails.zipCode}</p>
        </div>
      </ul>
      {props.getItemsFromCart()}
      <button onClick={hanldeSubmit} type="button">
        Confirm
      </button>
    </div>
  )
}

export default CheckoutConfirmation
