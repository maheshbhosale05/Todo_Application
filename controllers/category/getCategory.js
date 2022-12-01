const CategorySchema = require("../../model/category.schema");

const getCategory = async (req, res) => {
    try {
        const { userId } = req.body;

        if(!userId){
            throw new Error("There is some issue. Please logout and login again");
        }

        const categories = await CategorySchema.find({ userId });
        
        res.status(201).json(categories);

    } catch (error) {
        res.status(401).json({
            status: 401,
            error: error.message
        }); 
    }
};

module.exports = getCategory;