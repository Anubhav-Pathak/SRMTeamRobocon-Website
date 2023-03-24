import express from "express";
import getHome from "../controllers/admin.mjs";
import {getTeam, getAddMember, postAddMember, getEditMember, postEditMember, postDeleteMember} from "../controllers/Admin/Team.mjs"
import {getAlumni, getAddAlumni, postAddAlumni, postDeleteAlumni, getDetailsAlumni} from "../controllers/Admin/Alumni.mjs"
import {getAchievements, getAddAchievements, postAddAchievement, getEditAchievement, postEditAchievement, postDeleteAchievement} from "../controllers/Admin/Achievement.mjs"
import {getProjects, getAddProjects, postAddProject, getEditProject, postEditProject, postDeleteProject} from "../controllers/Admin/Project.mjs";
import {getAddTask, getTask, postAddTask, postDeleteTask} from "../controllers/Admin/Task.mjs";
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

router.get("/projects", isAuthorized, getProjects);
router.get("/add-project", isAuthorized, getAddProjects);
router.post("/add-project", isAuthorized, postAddProject);
router.get("/edit-project/:projectId", isAuthorized, getEditProject);
router.post("/edit-project", isAuthorized, postEditProject);
router.post("/delete-project", isAuthorized, postDeleteProject);

router.get("/task", isAuthorized, getTask);
router.get("/add-task", isAuthorized, getAddTask);
router.post("/add-task", isAuthorized, postAddTask );
router.post("/delete-task", isAuthorized, postDeleteTask);
export default router;