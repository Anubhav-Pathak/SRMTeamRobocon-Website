import Member from "../models/member.mjs";
import Alumni from "../models/alumni.mjs";
import Achievements from "../models/achievements.mjs";
import Projects from "../models/projects.mjs";

export const getHome = (req, res, next) => {
    Projects.find()
    .then((projects) => {
        res.render("client/home", {
            docTitle: "SRMTeamRobocon",
            path: "/",
            projects: projects
        });
    })
    .catch(e => console.log(e));
}

export const getTeam = (req, res, next) => {
    const sambed = [], siased = [], spaced = [], mcsocd = [], board = [];
    let teamLead;
    Member.find()
    .then(members => {
        return members.map(member => {
            if(member.position === "Team lead" || member.position === "Lead") board.push(member);
            else if(member.domain === "sambed") sambed.push(member);
            else if(member.domain === "siased") siased.push(member);
            else if(member.domain === "spaced") spaced.push(member);
            else mcsocd.push(member);
        })
    })
    .then(() => {
        res.render("client/team", {
            docTitle: "Our Team",
            path: "/team",
            board: board,
            sambed: sambed,
            siased: siased,
            spaced: spaced,
            mcsocd: mcsocd
        });
    })
    .catch(e => console.log(e));
}

export const getGallery = (req, res, next) => {
    res.render("client/gallery", {
        docTitle: "Our Snapshots",
        path: "/gallery",
    })
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
        res.render("client/alumni", {
            docTitle: `Admin | Alumni`,
            alumnis: passouts,
        })
    })
    .catch(e => console.log(e));
}

export const getAchievements = (req, res, next) => {
    Achievements.find()
    .then((achievements)=>{
        res.render("client/achievement", {
            docTitle: "Our Achievements",
            path: "/achievements",
            achievements: achievements
        })
    })
    .catch(e => console.log(e));
}