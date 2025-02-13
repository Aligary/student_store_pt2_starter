const express = require("express")
const router = express.Router()
const { createUserJwt } = require("../utils/tokens")
const security = require("../middleware/security")
const User = require("../models/user")

router.post("/login", async (req, res, next) => {
    try {
        const user = await User.login(req.body)
        const token = createUserJwt(user)
        return res.status(200).json({ user, token })
    } catch (err) {
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        const user = await User.register(req.body)
        const token = createUserJwt(user)
        return res.status(201).json({ user, token })
    } catch (err) {
        console.log(err)
        next(err)
    }
})

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { email } = res.locals.user
        const user = await User.fetchUserByEmail(email)
        const publicUser = User.makePublicUser(user)
        return res.status(200).json({ user: publicUser })
    } catch(err) {
        console.log("error")
        next(err)
    }
})

module.exports = router