import Tasks from "../models/tasks.mjs";

const getHome = (req, res, next) => {
    Tasks.find({assignee: req.admin}).populate('assignor')
    .then(tasks => {
        tasks = tasks.filter(task => task.assignor);
        res.render("admin/home", {
            docTitle: req.admin.name,
            path: '/admin/panel',
            tasks: tasks
        })
    })
    .catch(e => console.log(e));
}
export default getHome;