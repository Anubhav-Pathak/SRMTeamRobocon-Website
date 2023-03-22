export const getAddTasks = (req, res, next) => {
    res.render("admin/add_tasks", {
        docTitle: "Admin | Tasks",
        path: "/admin/task"
    });
}