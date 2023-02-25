import express from "express";
import { getAlumni, getHome, getTeam } from "../controllers/client.mjs";

const router = express.Router();

router.get("/", getHome);
router.get("/team", getTeam);
router.get("/alumni", getAlumni)

export default router;