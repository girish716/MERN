const Express = require("express");
const Router = Express.Router();

const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require("../controllers/tasks");

Router.route("/").get(getAllTasks).post(createTask);

Router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);


module.exports = Router;