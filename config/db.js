const mongoose = require("mongoose");

const connectDB = () => {
    mongoose
    .connect(process.env.MONGO_URL)
    .then((conn) => {
        console.log(`Connected to DB: ${conn.connection.host}`);
    })
    .catch((err) => {
        console.log(`Connection to DB failed ${err.message}`);
        process.exit(1);
    })
};

module.exports = connectDB;