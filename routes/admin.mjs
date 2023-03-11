import express from "express";
import { getAchievements, getAddAchievements, getAddAlumni, getAddMember, getAddTasks, getAlumni, getDetailsAlumni, getEditAchievement, getEditMember, getHome, getTeam, postAddAchievement, postAddAlumni, postAddMember, postDeleteAchievement, postDeleteAlumni, postDeleteMember, postEditAchievement, postEditMember } from "../controllers/admin.mjs";
import isAuthorized from "../middlewares/isAuthorized.mjs"

const router = express.Router();

router.get("/", isAuthorized, getHome);

router.get("/team", isAuthorized, getTeam);

router.get("/add", isAuthorized, getAddMember);
router.post("/add", isAuthorized, postAddMember);
router.get("/edit-member/:memberId", isAuthorized, getEditMember);
router.post("/edit-member", isAuthorized, postEditMember);
router.post("/delete-member", isAuthorized, postDeleteMember);

router.get("/alumni", isAuthorized, getAlumni);
router.get("/add-alumni/:memberId", isAuthorized, getAddAlumni);
router.post("/add-alumni",isAuthorized, postAddAlumni);
router.post("/delete-alumni", isAuthorized, postDeleteAlumni);
router.get("/alumni/:alumniId", isAuthorized, getDetailsAlumni);

router.get("/achievements", isAuthorized, getAchievements);
router.get("/add-achievement", isAuthorized, getAddAchievements);
router.post("/add-achievement", isAuthorized, postAddAchievement);
router.get("/edit-achievement/:achievementId", isAuthorized, getEditAchievement);
router.post("/edit-achievement", isAuthorized, postEditAchievement);
router.post("/delete-achievement", isAuthorized, postDeleteAchievement);

router.get("/add-task", isAuthorized, getAddTasks);

export default router;