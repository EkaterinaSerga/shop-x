const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  firstName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  city: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING
  },
  zipCode: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  country: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  orderTotal: {
    type: Sequelize.INTEGER,
    set(dollars) {
      this.setDataValue('orderTotal', dollars * 100)
    },
    get() {
      return this.getDataValue('orderTotal') / 100
    }
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
