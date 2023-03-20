import { request } from "express";

const isAuthorized = (request, respond, next) => {
    if(!request.session.isAuthenticated){
        return respond.redirect('/login');
    }
    next();
}

export default isAuthorized;