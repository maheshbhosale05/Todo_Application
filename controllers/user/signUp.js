const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserModel = require("../../model/user.schema");

const signUp = async (req, res) => {
    try {
        // collect all information
        const { name, email, password } = req.body;
        
        // validate the data, if exists
        if(!(name && email && password)) {
            throw new Error("All fields are required");
        }
        
        // check if user exists
        const existingUser = await UserModel.findOne({ email });
        if(existingUser){
            throw new Error("User Already Found in Database");
        }

         // encrypt password
         const encryptPassword = await bcrypt.hash(password, 10);

        // create new entry in database
        const user = await UserModel.create({
            name,
            email,
            password: encryptPassword
        });

        //  create a token and send it to user
        const token = jwt.sign({
            _id: user._id, email
        }, process.env.SECRET, {expiresIn: "2h"});

        user.token = token;
        // don't want to send the password
        // user.password = undefined

        res.status(201).json(user);

    } catch (error) {
        res.status(401).json({
            status: 401,
            error: error.message
        }); 
    }
};

module.exports = signUp;