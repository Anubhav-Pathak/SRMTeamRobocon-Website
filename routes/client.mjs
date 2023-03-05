import express from "express";
import { getAchievements, getAlumni, getHome, getTeam } from "../controllers/client.mjs";

const router = express.Router();

router.get("/", getHome);
router.get("/team", getTeam);
router.get("/alumni", getAlumni);
router.get("/achievements", getAchievements);

export default router;