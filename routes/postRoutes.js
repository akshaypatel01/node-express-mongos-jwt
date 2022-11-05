const express = require("express")
const { deletePost, retrivePost, addPost, updatePost } = require("../controllers/postController")
const auth = require("../middlewares/auth")

const postRoutes = express.Router()


postRoutes.post("/add_post", auth, addPost)
postRoutes.get("/retrive_post", auth,  retrivePost)
postRoutes.delete("/delete_post/:id", auth, deletePost)
postRoutes.put("/update_post/:id", auth, updatePost)

module.exports = postRoutes


