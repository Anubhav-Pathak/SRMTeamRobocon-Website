import { request } from "express";

const isAuthorized = (request, respond, next) => {
    if(!request.session.isAuthenticated){
        return respond.redirect('/login');
    }
    next();
}

const isBoard = (req, res, next) => {
}

export default isAuthorized;