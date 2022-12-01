const TaskSchema = require("../../model/task.schema");
const getTask = require("./getTask");
const updateCategoryTime = require("./updateCategoryTime");

const addTask = async (req, res) => {
    try {
        const { categoryId, taskId, taskName, taskDescription, taskStatus } = req.body;
        if(!categoryId){
            throw new Error("There is some issue. Please logout and login again");
        }
        if(!taskName){
            throw new Error("Category Name is Required");
        }
        let status = 0;
        let prevStatus = 0
        if(taskId){
            const task = await TaskSchema.findOne({_id : taskId});
            switch (true) {
                case taskName:
                    task.taskName = taskName;
                case taskStatus:
                    prevStatus = task.taskStatus
                    task.taskStatus = taskStatus;
                    status = taskStatus;
                case taskDescription:
                    task.taskDescription = taskDescription;
                default:
                    break;
            }
            await task.save();
        }else{
            category = await TaskSchema.create({
                taskName,
                taskDescription,
                categoryId
            });
            status = 1;
        };
        
        await updateCategoryTime({addTaskStatus: status, removeTaskStatus: prevStatus, categoryId });

        await getTask(req, res);
        
    } catch (error) {
        res.status(401).json({
            status: 401,
            error: error.message
          });
    }
};

module.exports = addTask;