const TaskSchema = require("../../model/task.schema");

const getTask = async (req, res) => {
    try {
        const { categoryId } = req.body;

        if(!categoryId){
            throw new Error("There is some issue. Please logout and login again");
        }

        const tasks = await TaskSchema.find({categoryId});
        
        res.status(201).json(tasks);

    } catch (error) {
        res.status(401).json({
            status: 401,
            error: error.message
        });   
    }
};

module.exports = getTask;