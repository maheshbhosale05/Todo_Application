const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserModel = require("../../model/user.schema");

const login = async (req, res) => {
    try {
        
        // collect information from FE
        const { email, password } = req.body;
        
        // validate
        if(!(email && password)){
            throw new Error("All Fields are Required");
        }
    
        // check user in db
        const user = await UserModel.findOne({email});
    
        // if user does not exist
        // match password
        if(user && (await bcrypt.compare(password, user.password))){

            const token = await jwt.sign({
                id:user._id.toString(), 
                email
            }, process.env.SECRET, {expiresIn: "2h"});
    
            user.password = undefined;
            user.token = token;
    
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
    
            res.status(201).cookie("token", token, options).json({
                success: true,
                token,
                user
            });
        }else{
            // create token and send
            throw new Error ("email or password is incorrect");
        }
    
        
    } catch (error) {
        res.status(401).json({
            status: 401,
            error: error.message
        });
    }
};

module.exports = login;