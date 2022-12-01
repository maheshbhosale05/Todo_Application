const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            require: [true, "Name is Required"],
            trim: true,
            maxLenght:  [50, "Name must be less than 50"]
        },
        email: {
            type: String,
            require: [true, "Email is Required"],
            unique: true
        },
        password: {
            type: String,
            require: [true, "Password is Required"],
            minLenght:  [6, "Password must be at least 8 Characters"]
        },
        token: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", UserSchema);