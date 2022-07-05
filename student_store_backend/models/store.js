const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Store {
  static async listProducts() {
      //run SQL query that searches the database for all products and returns a list of them.
      
  }
}

module.exports = Store
