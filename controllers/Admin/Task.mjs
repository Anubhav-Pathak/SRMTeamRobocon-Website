import Member from "../../models/member.mjs";
import Tasks from "../../models/tasks.mjs";

export const getTask = (req, res, next) => {
    Tasks.find({assignor: req.admin._id}).populate("assignee")
    .then((tasks) => {
        res.render("admin/task", {
            docTitle: "Admin | Tasks",
            path: "/admin/tasks",
            tasks: tasks,
        })
    })
    .catch(e => console.log(e));
}

export const getAddTask = (req, res, next) => {
    Member.find({domain: req.admin.domain})
    .then((members)=>{
        res.render("admin/add_tasks", {
            docTitle: "Admin | Tasks",
            path: "/admin/task",
            editing: false,
            members: members
        });
    })
    .catch(e => console.log(e));
}

export const postAddTask = (req, res, next) => {
    const task = new Tasks({
        assignedOn: new Date(),
        description: req.body.description,
        assignee: req.body.assignee,
        assignor: req.admin,
        status: "Pending",
        deadline: req.body.deadline,
    });
    task.save()
    .then(()=>res.redirect("/admin/task"))
    .catch(e => console.log(e));
}

export const postDeleteTask = (req, res, next) => {
    const taskId = req.body.taskId;
    Tasks.findByIdAndDelete(taskId)
    .then(() => res.redirect("/admin/task"))
    .catch(e => console.log(e));
}