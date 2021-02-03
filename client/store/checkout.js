import axios from 'axios'

//action types

const COMPLETE_ORDER = 'COMPLETE_ORDER'

//action creators
const updateOrder = order => ({
  type: COMPLETE_ORDER,
  order
})

//state
const initialState = {}

//thunk
export const completeOrder = event => {
  return async dispatch => {
    try {
      event.preventDefault()
      const orderId = event.target.id

      await axios
        .put(`/api/orders/${orderId}`, {
          orderTotal,
          complete: true,
          userId
        })
        .then(order => {
          dispatch(updateOrder(order))
        })
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPLETE_ORDER:
      return state
    default:
      return state
  }
}
