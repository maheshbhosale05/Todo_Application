const CategorySchema = require("../../model/category.schema");
const TaskSchema = require("../../model/task.schema");
const getCategory = require("./getCategory");

const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.body;

        if(!categoryId){
            throw new Error("There is some issue. Please try again.");
        }
        
        const deletedCategory = await CategorySchema.deleteOne({_id: categoryId});

        if(!deletedCategory){
            throw new Error("Category is not Present.");
        }

        await TaskSchema.deleteMany({categoryId});

        await getCategory(req, res);
        
    } catch (error) {
        res.status(401).json({
            status: 401,
            error: error.message
        }); 
    }

};

module.exports = deleteCategory;