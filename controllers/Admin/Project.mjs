import Projects from "../../models/projects.mjs"

export const getProjects = (req, res, next) => {
    Projects.find()
    .then((projects)=>{
        res.render("admin/project", {
            docTitle: "Admin | Projects",
            path: "/admin/projects",
            projects: projects
        })
    })
}

export const getAddProjects = (req, res, next) => {
    res.render("admin/add_project", {
        docTitle: "Admin | Add Projects",
        path: "/admin/add-project",
        editing: false,
    });
}

export const postAddProject = (req, res, next) => {
    const project = new Projects({
        name: req.body.name,
        description: req.body.description
    })
    project.save()
    .then(()=>{
        res.redirect('/admin/projects');
    })
    .catch((e)=>console.log(e));
}

export const getEditProject = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) return res.redirect('/admin/projects');
    const projectId = req.params.projectId;
    Projects.findById(projectId)
    .then(project => {
        if(!project) return res.redirect("/admin/projects");
        res.render("admin/add_project", {
            docTitle: "Edit Project",
            path: "/admin/edit-project",
            editing: editMode,
            projects: project
        });
    })
    .catch(e => console.log(e));
}

export const postEditProject = (req, res, next) => {
    const projectId = req.body.projectId;
    Projects.findById(projectId)
    .then(project => {
        if(project.id.toString() !== req.body.projectId.toString()) return respond.redirect('/admin/projects');
        project.name = req.body.name;
        project.description = req.body.description;
        return project.save()
    })
    .then(() => res.redirect("/admin/projects"))
    .catch(e => console.log(e));
}

export const postDeleteProject = (req, res, next) => {
    const projectId = req.body.projectId;
    Projects.findByIdAndDelete(projectId)
    .then(() => res.redirect("/admin/projects"))
    .catch(e => console.log(e));
}