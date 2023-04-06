import Member from "../models/member.mjs";
import bcrypt from "bcryptjs";

export const getLogin = (req, res, next) => {
    res.render("client/login", {
        docTitle: "Robocon | Login",
        path: '/login'
    })
}

export const postLogin = (req, res, next) => {
    const registerNo = req.body.registerNo;
    const password = req.body.password;
    Member.findOne({registerNo: registerNo})
    .then(member => {
        bcrypt.compare(password, member.password)
        .then(match => {
            if(match){
                req.session.isAuthenticated = true;
                req.session.admin = member;
                return req.session.save(() => res.redirect("/admin"));
            }
            res.redirect("/login");
        })
        .catch(() => res.redirect('/login'));
    })
    .catch(() => res.redirect('/login'));
}

export const postLogout = (req, res, next) => {
    req.session.destroy(() => res.redirect("/"));
}