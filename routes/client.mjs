import express from "express";
import { getAchievements, getAlumni, getGallery, getHome, getTeam } from "../controllers/client.mjs";

const router = express.Router();

router.get("/", getHome);
router.get("/team", getTeam);
router.get("/alumni", getAlumni);
router.get("/achievements", getAchievements);
router.get("/gallery", getGallery);

export default router;