const mongoose = require("mongoose");
const { TASK_STATUS } = require("../utils/constant");

const { Schema } = mongoose;

const TaskSchema = new Schema(
    {
        taskName: {
            type: String,
            require: [true, "Name is Required"],
            maxLenght:  [100, "Name must be less than 100"]
        },
        taskDescription: {
            type: String,
            default: null
        },
        taskStatus: {
            type: Number,
            default: TASK_STATUS.TODO
        },
        categoryId: {
            type: String,
            default: null,
            require: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", TaskSchema);