import Member from "../models/member.mjs";
import Alumni from "../models/alumni.mjs";
import Achievements from "../models/achievements.mjs";
import Projects from "../models/projects.mjs";
import Task from "../models/tasks.mjs";

import bcrypt from "bcryptjs";
import moment from "moment/moment.js";


export const getHome = (req, res, next) => {
    res.render("admin/home", {
        docTitle: req.admin.name,
    })
}

export const getTeam = (req, res, next) => {
    const query = req.admin.position === "Team lead" ? {} : {domain: req.admin.domain};
    Member.find(query)
    .then(members =>{
        res.render("admin/team", {
            docTitle: `Admin | Members`,
            team: members
        })
    })
    .catch(e => console.log(e));
}

export const getAddMember = (req, res, next) => {
    res.render("admin/add_member", {
        docTitle: "Admin | Add Member",
        path: "admin/add",
        editing: false
    })
}

export const postAddMember = (req, res, next) => {
    const password = req.body.password;
    bcrypt.hash(password, 12)
    .then(hashedPassword => {
        const newMember = new Member({
            name: req.body.name,
            registerNo: req.body.registerNo,
            email: req.body.email,
            phone: req.body.phone,
            linkedIn: req.body.linkedin,
            instagram: req.body.instagram,
            domain: req.body.domain,
            position: req.body.position,
            dob: req.body.dob,
            doj: req.body.doj,
            password: hashedPassword
        });
        return newMember.save();
    })
    .then(() => {
        res.redirect("/admin/team");
    })
    .catch((e) => console.log(e));
}

export const getEditMember = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) return res.redirect('/admin/team');
    const memberId = req.params.memberId;
    Member.findById(memberId)
    .then(member => {
        if(!member) return res.redirect("/admin/team");
        res.render("admin/add_member", {
            docTitle: "Edit Member",
            path: "/admin/edit-member",
            editing: editMode,
            member: member,
            dob: moment(member.dob).utc().format("YYYY-MM-DD"),
            doj: moment(member.doj).utc().format("YYYY-MM-DD")
        });
    })
    .catch(e => console.log(e));
}

export const postEditMember = (req, res, next)=>{
    const memberId = req.body.memberId;
    const password = req.body.email.split('@')[0]+req.body.dob.split("-")[0];
    Member.findById(memberId)
    .then(member => {
        if(member.id.toString() !== req.body.memberId.toString()) return respond.redirect('/admin/team');
        bcrypt.hash(password, 12)
        .then((hashedPassword) => {
            member.name = req.body.name;
            member.registerNo = req.body.registerNo;
            member.email = req.body.email;
            member.phone = req.body.phone;
            member.linkedIn = req.body.linkedin;
            member.instagram = req.body.instagram;
            member.domain = req.body.domain;
            member.position = req.body.position;
            member.dob = req.body.dob;
            member.doj = req.body.doj;
            member.password = hashedPassword;
            return member.save()
        })
        .then(() => res.redirect("/admin/team"));
    })
    .catch(e => console.log(e));
}

export const postDeleteMember = (req, res, next) => {
    const memberId = req.body.memberId;
    Member.deleteOne({_id: memberId})
    .then(() => res.redirect("/admin/team"))
    .catch(e => console.log(e));
}

export const getAddAlumni = (req, res, next) => {
    const memberId = req.params.memberId;
    Member.findById(memberId)
    .then((member) => {
        return res.render("admin/add_alumni", {
            docTitle: "Add Alumni",
            member: member
        })
    })
    .catch(e => console.log(e))
}

export const postAddAlumni = (req, res, next) => {
    const memberId = req.body.memberId;
    Member.findById(memberId)
    .then((member) => {
        const alumni  = new Alumni({
            memberId: {...member},
            passoutYear: req.body.passoutYear,
            quote: req.body.quote,
            description: [req.body.about, req.body.experience]
        })
        return alumni.save();
    })
    .then(() => {
        return Member.findByIdAndDelete(memberId)
    })
    .then(()=>{
        return res.redirect("/admin/alumni");
    })
    .catch(e => console.log(e))
}

export const getAlumni = (req, res, next) => {
    Alumni.find()
    .then(alumnis => {
        let passoutYears = alumnis.map((alumni)=>alumni.passoutYear);
        passoutYears = passoutYears.filter((value, index, array) => array.indexOf(value) === index);
        const passouts = [];
        passoutYears.forEach((passoutYear)=>{
            passouts.push({[passoutYear]: alumnis.filter(alumni => alumni.passoutYear === passoutYear)})
        });
        res.render("admin/alumni", {
            docTitle: `Admin | Alumni`,
            alumnis: passouts,
        })
    })
    .catch(e => console.log(e));
}

export const postDeleteAlumni = (req, res, next) => {
    const alumniId = req.body.alumniId;
    Alumni.findByIdAndDelete(alumniId)
    .then(() => res.redirect("/admin/alumni"))
    .catch(e => console.log(e));
}

export const getDetailsAlumni = (req, res, next) => {
    const alumniId = req.params.alumniId;
    Alumni.findById(alumniId)
    .then(alumni => {
        res.render("admin/alumni_details", {
            docTitle: `Admin | Alumni`,
            alumni: alumni
        });
    })
    .catch(e => console.log(e))
}

export const getAchievements = (req, res, next) => {
    Achievements.find()
    .then((achievements)=>{
        res.render("admin/achievement", {
            docTitle: "Admin | Achievements",
            path: "/admin/achievements",
            achievements: achievements
        })
    })
}

export const getAddAchievements = (req, res, next) => {
    res.render("admin/add_achievement", {
        docTitle: "Admin | Add Achievements",
        path: "/admin/add-achievement",
        editing: false,
    });
}

export const postAddAchievement = (req, res, next) => {
    const achievement = new Achievements({
        name: req.body.name,
        description: req.body.description
    })
    achievement.save()
    .then(()=>{
        res.redirect('/admin/achievements');
    })
    .catch((e)=>console.log(e));
}

export const getEditAchievement = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) return res.redirect('/admin/achievements');
    const achievementId = req.params.achievementId;
    Achievements.findById(achievementId)
    .then(achievement => {
        if(!achievement) return res.redirect("/admin/achievements");
        res.render("admin/add_achievement", {
            docTitle: "Edit Achievement",
            path: "/admin/edit-achievements",
            editing: editMode,
            achievement: achievement
        });
    })
    .catch(e => console.log(e));
}

export const postEditAchievement = (req, res, next) => {
    const achievementId = req.body.achievementId;
    Achievements.findById(achievementId)
    .then(achievement => {
        if(achievement.id.toString() !== req.body.achievementId.toString()) return respond.redirect('/admin/achievements');
        achievement.name = req.body.name;
        achievement.description = req.body.description;
        return achievement.save()
    })
    .then(() => res.redirect("/admin/achievements"))
    .catch(e => console.log(e));
}

export const postDeleteAchievement = (req, res, next) => {
    const achievementId = req.body.achievementId;
    Achievements.findByIdAndDelete(achievementId)
    .then(() => res.redirect("/admin/achievements"))
    .catch(e => console.log(e));
}

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

export const getAddTasks = (req, res, next) => {
    res.render("admin/add_tasks", {
        docTitle: "Admin | Tasks",
        path: "/admin/task"
    });
}