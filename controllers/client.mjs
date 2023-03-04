import Member from "../models/member.mjs";
import Alumni from "../models/alumni.mjs";
import Achievements from "../models/achievements.mjs";

export const getHome = (req, res, next) => {
    res.render("client/home", {
        docTitle: "SRMTeamRobocon",
        path: "/"
    });
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

export const getAlumni = (req, res, next) => {
    Alumni.find()
    .then((alumnis)=>{
        res.render("client/alumni", {
            docTitle: "Our Alumnis",
            path: "/alumnis",
            alumnis: alumnis
        })
    })
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
}