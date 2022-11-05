const mongoose = require("mongoose");


const postSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        require: true,
        default: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        require: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },

    }

}, { timestamps: true })


module.exports = mongoose.model("Post", postSchema)