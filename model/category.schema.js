const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema(
    {
        categoryName: {
            type: String,
            require: [true, "Name is Required"],
            maxLenght:  [100, "Name must be less than 100"]
        },
        todoTask: {
            type: Number,
            default: 0
        },
        inprogressTask: {
            type: Number,
            default: 0
        },
        completedTask: {
            type: Number,
            default: 0
        },
        userId: {
            type: String,
            default: null,
            require: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Category", CategorySchema);