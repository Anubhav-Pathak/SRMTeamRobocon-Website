import Member from "../../models/member.mjs";
import Tasks from "../../models/tasks.mjs";
import moment from "moment/moment.js";

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

export const getEditTask = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) return res.redirect('/admin/task');
    const taskId = req.params.taskId;
    let tasks;
    Tasks.findById(taskId)
    .then(task => {
        if(!task) return res.redirect("/admin/task");
        tasks = task;
        return Member.find({domain: req.admin.domain});
    })
    .then(members => {
        res.render("admin/add_tasks", {
            docTitle: "Edit Task",
            path: "/admin/add-task",
            editing: editMode,
            task: tasks,
            members: members,
            deadline: moment(tasks.deadline).utc().format("YYYY-MM-DD")
        });
    })
    .catch(e => console.log(e));
}

export const postEditTask = (req, res, next) => {
    const taskId = req.body.taskId;
    Tasks.findById(taskId)
    .then(task => {
        task.description = req.body.description;
        task.deadline = req.body.deadline;
        task.assignee = req.body.assignee;
        task.status = "Pending";
        return task.save()
    })
    .then(() => {
        return res.redirect('/admin/task');
    })
    .catch(e => console.log(e));
}

export const postDeleteTask = (req, res, next) => {
    const taskId = req.body.taskId;
    Tasks.findByIdAndDelete(taskId)
    .then(() => res.redirect("/admin/task"))
    .catch(e => console.log(e));
}

export const postCompleteTask = (req, res, next) => {
    const taskId = req.body.taskId;
    Tasks.findById(taskId)
    .then(task => {
        task.status = "Completed";
        return task.save();
    })
    .then(() => res.redirect("/admin"))
    .catch(e => console.log(e))
}

export const postCancelTask = (req, res, next) => {
    const taskId = req.body.taskId;
    Tasks.findById(taskId)
    .then(task => {
        task.status = "Cancelled";
        return task.save();
    })
    .then(() => res.redirect("/admin"))
    .catch(e => console.log(e))
}