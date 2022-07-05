const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Order {
  static async listOrdersForUser() {
    //return all orders that the authenticated user has created. 
    const results = await db.query(
      `
      SELECT o.id AS orderId,
             o.customer_id AS customerId,
             od.quantity AS quantity,
             p.name AS name,
             p.price AS price
             
      FROM orders AS o
        JOIN order_details AS od ON od.order_id = o.id
        JOIN products AS p on p.id = orders.id
      `
    )
  }

  static async createOrder(user, order  ) {
    // take a user's order and store it in the database.
    const requiredFields = ["product_id", "quantity"]
    requiredFields.forEach((field) => {
      if(!order.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`)
      }
    })

    const result = await db.query(
      `
        INSERT INTO orders (customer_id)
        VALUES (SELECT id FROM users WHERE email = $1)
        RETURNING id, customer_id;
      `[user.email]
    )
    const orderId = result.rows[0].id

    await order.map((e, i) => {
      let res = db.query(
        `
        `
      )
    })
  }
}

module.exports = Order
