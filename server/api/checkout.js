const router = require('express').Router()
// const {Product} = require('../db/models')
const {Order, OrderDetail, Product} = require('../db/models')
module.exports = router

router.put('/:id', async (req, res, next) => {
  try {
    await Order.update(
      {
        orderTotal: null,
        complete: true,
        userId: req.body.userId
      },
      {
        where: {
          id: Order.userId
        }
      }
    )
  } catch (error) {
    next(error)
  }
  const updatedOrder = await Order.findOne({
    where: {
      id: req.params.id
    }
  })
  res.json({
    message: 'update successful',
    product: updatedOrder
  })
})
