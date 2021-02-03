const router = require('express').Router()
// const {Product} = require('../db/models')
const {Order, OrderDetail, Product} = require('../db/models')
module.exports = router

//./api/cart
// router.post('/', async (req, res, next) => {
//   try {
//     const userId = req.session.passport
//       ? Number(req.session.passport.user)
//       : null
//     const order = await Order.create({userId})

//     req.body.products.forEach(async product => {
//       await OrderDetail.create({
//         orderId: Number(order.id),
//         productId: Number(product.id),
//         productQty: Number(product.quantity),
//         price: Number(product.price)
//       })
//     })
//     res.status(200).send('You order has been created')
//   } catch (error) {
//     console.log(error)
//   }
// })

router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      let order = await Order.findOrCreate({
        where: {
          userId: req.body.userId,
          complete: false
        },
        include: [Product]
      })
      const product = await Product.findByPk(req.body.id)

      await product.addOrder(order[0], {
        through: {
          productQty: req.body.qty,
          price: req.body.price
        }
      })
      order.save()
      res.send(order)
    } else {
      res.status(401).json('User does not have post orderDetails access.')
    }
  } catch (err) {
    next(err)
  }
})

// router.put('/:id', async (req, res, next) => {
//   try {
//     await Order.update(
//       {
//         orderTotal: null,
//         complete: true,
//         userId: req.body.userId
//       },
//       {
//         where: {
//           id: Order.userId
//         }
//       }
//     )
//   } catch (error) {
//     next(error)
//   }
//   const updatedOrder = await Order.findOne({
//     where: {
//       id: req.params.id
//     }
//   })
//   res.json({
//     message: 'update successful',
//     product: updatedOrder
//   })
// })

router.get('/:userId/', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findOne({
        where: {
          userId: req.params.userId,
          complete: false
        },
        include: [Product]
      })
      const data = await order.getProducts()
      res.json({data, id: order.id})
    } else {
      res.status(401).json('User does not have get orderDetails access.')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    if (req.user) {
      const modifyOrder = await OrderDetail.findOne({
        where: {
          orderId: req.body.orderId,
          productId: req.body.productId
        }
      })
      modifyOrder.productQty = Number(req.body.qty)
      modifyOrder.save()
      res.send(modifyOrder)
    } else {
      res.status(401).json('User does not have put orderDetails access.')
    }
  } catch (err) {
    next(err)
  }
})
