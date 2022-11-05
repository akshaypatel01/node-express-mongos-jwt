const postModel = require("../models/post")
const mongoose = require("mongoose")

const addPost = async (req, res) => {

    try {
        const { title, body, isActive, location, userId } = req.body

        const newPost = await postModel.create({
            title: title,
            body: body,
            isActive: isActive,
            location: location,
            userId: userId
        })
        res.status(201).json({ post: newPost })
    } catch (error) {
        res.status(500).json({ message: "something went wrong :" + error })
    }
}
const updatePost = async (req, res) => {
    try {
        const id = req.params.id
        const { title, body, isActive, location } = req.body
        const newPost = {
            title: title,
            body: body,
            isActive: isActive,
           
        }
        console.log(id)
       const newP = await postModel.findByIdAndUpdate(id, newPost)
        res.status(200).json({ message: "post updated" })
    } catch (error) {
        res.status(500).json({ message: "something went wrong :" + error })
    }

}
const deletePost = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        const post = await postModel.findByIdAndRemove(id)
        res.send(202).json(post)
    } catch (error) {
        res.status(500).json({ message: "something went wrong :" + error })
    }
}
const retrivePost = async (req, res) => {
    try {
        const userId = req.body.userId
        const posts = await postModel.find({ userId: userId })
        if (!posts) {
            res.status(400).json({ message: "post not found :" + err })
        } else {
            res.status(200).json({ post: posts })
        }

    } catch (error) {
        res.status(500).json({ message: "something went wrong : " + error })
    }

}

module.exports = { addPost, updatePost, deletePost, retrivePost }