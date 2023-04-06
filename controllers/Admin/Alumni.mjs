import Member from "../../models/member.mjs";
import Alumni from "../../models/alumni.mjs";

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
            path: '/admin/alumni',
            alumnis: passouts,
        })
    })
    .catch(e => console.log(e));
}

export const getAddAlumni = (req, res, next) => {
    const memberId = req.params.memberId;
    Member.findById(memberId)
    .then((member) => {
        return res.render("admin/add_alumni", {
            docTitle: "Add Alumni",
            path: '/admin/add-alumni',
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
            path: '/admin/alumni-detail',
            alumni: alumni
        });
    })
    .catch(e => console.log(e))
}