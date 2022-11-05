const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// const secret_key = "CRUDAPPUSINGJWT"


const signup = async (req, res) => {
    //existing user check
    //Hashed pwd
    //create user
    //token generate
    const { userName, email, password } = req.body
   
    try {
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "user aleredy exists!" })
        }

        const hashCode = process.env.hashCode
        const hashedPassword = await bcrypt.hash(password, hashCode)

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            userName: userName
        })
        const secret= process.env.secret_key
        const token = jwt.sign({ email: result.email, id: result._id }, secret)
        res.status(201).json({ user: result, token: token })


    } catch (err) {
        res.status(500).json({ message: "Something went wrong : "+err })
    }


}
const login = async (req, res) => {

    const { userName, email, password } = req.body
    try {
        const existingUser = await userModel.findOne({ email: email })
        if (!existingUser) {
            return res.status(404).json("user not found!")
        }
        const matchPwd = await bcrypt.compare(password, existingUser.password)

        if (!matchPwd) {
            return res.status(400).json({ message: "Invalid Credatial" })
        }
        const secret=process.env.secret_key
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret)
        res.status(201).json({ user: existingUser, token: token })

    } catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }


}
const logout = async (req, res) => {

}

module.exports = { signup, login, logout }