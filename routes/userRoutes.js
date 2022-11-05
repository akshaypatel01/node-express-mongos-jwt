const express = require("express")
const { signup, login, logout } = require("../controllers/userController")
const userRoutes = express.Router()

userRoutes.post("/signup", signup)
userRoutes.post("/login", login)
userRoutes.post("/logout", logout)

module.exports = userRoutes