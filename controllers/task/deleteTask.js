const TaskSchema = require("../../model/task.schema");
const getTask = require("./getTask");
const updateCategoryTime = require("./updateCategoryTime");

const deleteTask = async (req, res) => {
    try {
        const { taskId, categoryId } = req.body;

        if(!taskId){
            throw new Error("There is some issue. Please try again.");
        }
        
        const deletedTask = await TaskSchema.findOne({_id: taskId});

        if(!deletedTask?._id){
            throw new Error("task is not Present.");
        }else{
            await TaskSchema.deleteOne({_id: taskId});
            await updateCategoryTime({removeTaskStatus: deletedTask.taskStatus, categoryId });
        }

        await getTask(req, res);
        
    } catch (error) {
        res.status(401).json({
            status: 401,
            error: error.message
          });
    }

};

module.exports = deleteTask;