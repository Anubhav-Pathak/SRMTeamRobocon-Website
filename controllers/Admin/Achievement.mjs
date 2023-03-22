import Achievements from "../../models/achievements.mjs"

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