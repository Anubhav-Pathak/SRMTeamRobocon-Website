import express from "express";
import { getAddAlumni, getAddMember, getEditMember, getHome, getTeam, postAddAlumni, postAddMember, postDeleteMember, postEditMember } from "../controllers/admin.mjs";
import isAuthorized from "../middlewares/isAuthorized.mjs"

const router = express.Router();

router.get("/", isAuthorized, getHome);
router.get("/team", isAuthorized, getTeam);
router.get("/add", isAuthorized, getAddMember);
router.post("/add", isAuthorized, postAddMember);
router.get("/edit-member/:memberId", isAuthorized, getEditMember);
router.post("/edit-member", isAuthorized, postEditMember);
router.post("/delete-member", isAuthorized, postDeleteMember);
router.get("/add-alumni/:memberId", isAuthorized, getAddAlumni);
router.post("/add-alumni",isAuthorized, postAddAlumni)

export default router;