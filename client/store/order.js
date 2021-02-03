import axios from 'axios'

//action types
const POST_ORDER = 'POST_ORDER'
const GET_ORDER = 'GET_ORDER'

//action creators
export const postSingleOrder = order => ({
  type: POST_ORDER,
  order
})

export const getOrder = order => ({
  type: GET_ORDER,
  order: order
})

//state
const initialState = {}

//thunk
export function postSingleOrderThunk() {
  return async dispatch => {
    try {
      const arrayOfProducts = JSON.parse(localStorage.getItem('cart'))
      const {data} = await axios.post(`/api/cart`, {products: arrayOfProducts})
      dispatch(postSingleOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function fetchOrderThunk(id) {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${id}`)
      console.log('I was in fetshorderthunk', data)
      dispatch(getOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER:
      return action.order
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}
