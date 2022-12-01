const CategorySchema = require("../../model/category.schema");
const getCategory = require("./getCategory");

const addCategory = async (req, res) => {
    try {
        const { userId, categoryName, categoryId } = req.body;
        if(!userId){
            throw new Error("There is some issue. Please logout and login again");
        }
        if(!categoryName){
            throw new Error("Category Name is Required");
        }
        if(categoryId){
            await CategorySchema.findOneAndUpdate({_id : categoryId}, {categoryName});

        }else{
            await CategorySchema.create({
                categoryName,
                userId
            });
        };
        await getCategory(req, res);
        
    } catch (error) {
        res.status(401).json({
            status: 401,
            error: error.message
        }); 
    }
};

module.exports = addCategory;