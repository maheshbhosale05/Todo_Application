const CategorySchema = require("../../model/category.schema");

const updateCategoryTime = async ({addTaskStatus, categoryId, removeTaskStatus}) => {
    const category = await CategorySchema.findOne({_id: categoryId});
    console.log("addTaskStatus", addTaskStatus);
    switch(addTaskStatus){
        case 2: 
            category.inprogressTask = category.inprogressTask + 1;
            break;
        case 3: 
            category.completedTask = category.completedTask + 1;
            break;
        case 1: 
            category.todoTask = category.todoTask + 1;
            break;
    };
    switch(removeTaskStatus){
        case 1: 
            category.todoTask = category.todoTask - 1;
            break;
        case 2: 
            category.inprogressTask = category.inprogressTask - 1;
            break;
        case 3: 
            category.completedTask = category.completedTask - 1;
            break;
    };

    await category.save();
}

module.exports = updateCategoryTime;