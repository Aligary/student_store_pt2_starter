const express = require("express")
const Order = require("../models/order")
const router = express.Router()
const security = require("../middleware/security")

router.get("/", security.requireAuthenticatedUser, async(req, res, next) => {
    try{
        const orders = await Order.listOrdersForUser()
        res.status(200).json({ orders })
    }catch(err){
        next(err)
    }
})

router.post("/", security.requireAuthenticatedUser,async(req, res, next) => {
    try{
        const { user } = res.locals
        const order = await Order.createOrder(user, req.body)
        res.status(201).json({ order })
    }catch(err){
        console.log("ERR")
        next(err)
    }
})
module.exports = router
