const CategorySchema = require("../../model/category.schema");
const TaskSchema = require("../../model/task.schema");

const search = async (req, res) => {
    try {
        const { isTaskSearch = false, searchValue } = req.body;

        let searchResult
        if(!isTaskSearch){
            searchResult = await TaskSchema.aggregate().search({
                index: "default",
                text: {
                  query: searchValue,
                  path: ["taskName", "taskDescription"]
                }
            });
        }else{
            searchResult = await CategorySchema.aggregate().search({
                index: "default",
                text: {
                  query: "Changing",
                  path: ["categoryName"],
                }
            });
        }
        res.status(201).json(searchResult);
    } catch (error) {
        res.status(401).json({
            status: 401,
            error: error.message
          });     
    }
};

module.exports = search;