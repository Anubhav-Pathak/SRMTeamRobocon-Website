import Member from "../../models/member.mjs";
import bcrypt from "bcryptjs";
import moment from "moment/moment.js";

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
    const password = req.body.password;
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